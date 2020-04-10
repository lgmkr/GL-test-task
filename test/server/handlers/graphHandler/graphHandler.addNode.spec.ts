import { ServerUnaryCall, status } from "grpc";

const mockedPrintResult = "mockedPrint";
const mockedAddNode = jest.fn();
const mockedPrint = jest.fn(() => mockedPrintResult);
const mockedSetGraph = jest.fn();
const mockedGraphResponse = jest.fn(() => ({ setGraph: mockedSetGraph }));

jest.mock("../../../../src/proto/generated", () => ({
  GraphResponse: mockedGraphResponse,
}));

jest.mock("../../../../src/server/graph/graph", () => ({
  Graph: jest.fn(() => ({ addNode: mockedAddNode, print: mockedPrint })),
}));
jest.mock("../../../../src/server/handlers/broadcastHandler");

import { AddNodeRequest } from "../../../../src/proto/generated";
import { GraphHandler } from "../../../../src/server/handlers";
import { GraphNode } from "../../../../src/server/graph";

const nodeKey = "A";
const mockedGetPeer = jest.fn();
const mockedGetKey = jest.fn().mockImplementation(() => nodeKey);

const mockedCall = {
  getPeer: mockedGetPeer,
  request: { getKey: mockedGetKey },
};

const mockedCallback = jest.fn();

describe("GraphDispatcherHandler", () => {
  describe("addNode", () => {
    beforeEach(() => {
      mockedGetPeer.mockClear();
      mockedGetKey.mockClear();
      mockedCallback.mockClear();
      mockedAddNode.mockClear();
      mockedGraphResponse.mockClear();
    });

    describe("successfully added", () => {
      beforeEach(() => {
        const graphHandler = new GraphHandler();
        graphHandler.addNode(
          (mockedCall as unknown) as ServerUnaryCall<AddNodeRequest>,
          mockedCallback
        );
      });
      it("should return client identifier", () => {
        expect(mockedGetPeer).toBeCalledTimes(1);
      });

      it("should retrieve key from request", () => {
        expect(mockedGetKey).toBeCalledTimes(1);
      });

      it("should invoke graph addNode with correct params", () => {
        expect(mockedAddNode).toBeCalledTimes(1);
        expect(mockedAddNode).toBeCalledWith(new GraphNode(nodeKey));
      });

      it("should setup graph response message", () => {
        expect(mockedGraphResponse).toBeCalledTimes(1);
        expect(mockedSetGraph).toBeCalledTimes(1);
        expect(mockedSetGraph).toBeCalledWith(mockedPrintResult);
      });

      it("should invoke callback fn", () => {
        expect(mockedCallback).toBeCalledTimes(1);
        expect(mockedCallback).toBeCalledWith(null, new mockedGraphResponse());
      });
    });

    describe("Graph error catching", () => {
      const error = "Node already exists";
      beforeEach(() => {
        mockedAddNode.mockImplementationOnce(() => {
          throw new Error(error);
        });

        const graphHandler = new GraphHandler();
        graphHandler.addNode(
          (mockedCall as unknown) as ServerUnaryCall<AddNodeRequest>,
          mockedCallback
        );
      });

      it("should catch AddNode error and set callback properly", () => {
        expect(mockedCallback).toBeCalledTimes(1);
        expect(mockedCallback).toBeCalledWith(
          expect.objectContaining({
            code: status.INVALID_ARGUMENT,
            message: error,
          }),
          new mockedGraphResponse()
        );
      });
    });
  });
});
