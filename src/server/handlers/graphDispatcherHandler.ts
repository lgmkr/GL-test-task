import * as grpc from "grpc";
import {
  IGraphDispatcherServer,
  AddNodeRequest,
  GraphResponse,
  BroadMessageRequest,
  BroadMessageResponse,
  RemoveEdgeRequest,
  RemoveNodeRequest,
  AddEdgeRequest,
} from "../../proto/generated";
import { GraphNode, Graph, GraphEdge } from "../graph";

const graph = new Graph();
graph.addNode(new GraphNode("A"));
graph.addNode(new GraphNode("B"));
graph.addNode(new GraphNode("C"));

console.log(`Graph Default Nodes:\n${graph.print()}`);

const clientStore: {
  [key: string]: grpc.ServerDuplexStream<
    BroadMessageRequest,
    BroadMessageResponse
  >;
} = {};

const broadcast = (currentClientId: string) => {
  const graphView = graph.print();
  console.log(`Graph Updated:\n${graphView}`);

  for (const [clientId, clientCall] of Object.entries(clientStore)) {
    if (clientId === currentClientId) {
      continue;
    }

    const response = new BroadMessageResponse();
    response.setMessage(graphView);
    clientCall.write(response);
  }
};

type UnaryCallCallback = (
  error: grpc.ServiceError | null,
  response: GraphResponse
) => void;

export class GraphDispatcherHandler implements IGraphDispatcherServer {
  broadcasting(
    call: grpc.ServerDuplexStream<BroadMessageRequest, BroadMessageResponse>
  ) {
    const currentClientId = call.getPeer();
    clientStore[currentClientId] = call;
    console.log(`Client ${currentClientId} connected!`);

    call.on("cancelled", () => {
      delete clientStore[currentClientId];
      console.log(`Client ${currentClientId} disconnected!`);
    });
  }
  addNode(
    call: grpc.ServerUnaryCall<AddNodeRequest>,
    callback: UnaryCallCallback
  ) {
    const currentClientId = call.getPeer();
    const response = new GraphResponse();

    const newNode = new GraphNode(call.request.getKey());
    try {
      graph.addNode(newNode);
      response.setGraph(graph.print());
      callback(null, response);
    } catch (error) {
      callback(
        {
          code: grpc.status.INVALID_ARGUMENT,
          message: error.message,
          name: "Client error",
        },
        response
      );
    }

    broadcast(currentClientId);
  }
  removeNode(
    call: grpc.ServerUnaryCall<RemoveNodeRequest>,
    callback: UnaryCallCallback
  ) {
    const currentClientId = call.getPeer();
    const response = new GraphResponse();

    const nodeKey = call.request.getKey();
    try {
      graph.removeNode(nodeKey);
      response.setGraph(graph.print());
      callback(null, response);
    } catch (error) {
      callback(
        {
          code: grpc.status.NOT_FOUND,
          message: error.message,
          name: "Client error",
        },
        response
      );
    }

    broadcast(currentClientId);
  }
  addEdge(
    call: grpc.ServerUnaryCall<AddEdgeRequest>,
    callback: UnaryCallCallback
  ) {
    const currentClientId = call.getPeer();
    const newEdge = new GraphEdge(
      new GraphNode(call.request.getStartnode()),
      new GraphNode(call.request.getEndnode())
    );
    const response = new GraphResponse();

    try {
      graph.addEdge(newEdge);
      response.setGraph(graph.print());
      callback(null, response);
    } catch (error) {
      callback(
        {
          code: grpc.status.INVALID_ARGUMENT,
          message: error.message,
          name: "Client error",
        },
        response
      );
    }

    broadcast(currentClientId);
  }

  removeEdge(
    call: grpc.ServerUnaryCall<RemoveEdgeRequest>,
    callback: UnaryCallCallback
  ) {
    const currentClientId = call.getPeer();

    const startNodeKey = call.request.getStartnode();
    const endNodeKey = call.request.getEndnode();
    graph.removeEdge(startNodeKey, endNodeKey);

    const response = new GraphResponse();
    response.setGraph(graph.print());
    callback(null, response);

    broadcast(currentClientId);
  }
}
