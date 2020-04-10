import { ServerUnaryCall, status } from "grpc";

const mockedPrintResult = "mockedPrint";
const mockedRemoveNode = jest.fn();
const mockedPrint = jest.fn(() => mockedPrintResult);
const mockedSetGraph = jest.fn();
const mockedGraphResponse = jest.fn(() => ({ setGraph: mockedSetGraph }));

jest.mock("../../../../src/server/handlers/broadcastHandler");
jest.mock("../../../../src/proto/generated", () => ({
  GraphResponse: mockedGraphResponse,
}));
jest.mock("../../../../src/server/graph/graph", () => ({
  Graph: jest.fn(() => ({ removeNode: mockedRemoveNode, print: mockedPrint })),
}));

import { RemoveNodeRequest } from "../../../../src/proto/generated";
import { GraphHandler } from "../../../../src/server/handlers";

const nodeKey = "A";
const mockedGetPeer = jest.fn();
const mockedGetKey = jest.fn().mockImplementation(() => nodeKey);

const mockedCall = {
  getPeer: mockedGetPeer,
  request: { getKey: mockedGetKey },
};

const mockedCallback = jest.fn();

describe("GraphDispatcherHandler", () => {
  describe("removeNode", () => {
    beforeEach(() => {
      mockedGetPeer.mockClear();
      mockedGetKey.mockClear();
      mockedCallback.mockClear();
      mockedRemoveNode.mockClear();
      mockedGraphResponse.mockClear();
    });

    describe("successfully removed", () => {
      beforeEach(() => {
        const graphHandler = new GraphHandler();
        graphHandler.removeNode(
          (mockedCall as unknown) as ServerUnaryCall<RemoveNodeRequest>,
          mockedCallback
        );
      });
      it("should return client identifier", () => {
        expect(mockedGetPeer).toBeCalledTimes(1);
      });

      it("should retrieve key from request", () => {
        expect(mockedGetKey).toBeCalledTimes(1);
      });

      it("should invoke graph removeNode with correct params", () => {
        expect(mockedRemoveNode).toBeCalledTimes(1);
        expect(mockedRemoveNode).toBeCalledWith(nodeKey);
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
        mockedRemoveNode.mockImplementationOnce(() => {
          throw new Error(error);
        });

        const graphHandler = new GraphHandler();
        graphHandler.removeNode(
          (mockedCall as unknown) as ServerUnaryCall<RemoveNodeRequest>,
          mockedCallback
        );
      });

      it("should catch AddNode error and set callback properly", () => {
        expect(mockedCallback).toBeCalledTimes(1);
        expect(mockedCallback).toBeCalledWith(
          expect.objectContaining({
            code: status.NOT_FOUND,
            message: error,
          }),
          new mockedGraphResponse()
        );
      });
    });
  });
});
