import * as grpc from "grpc";
import {
  IGraphDispatcherServer,
  AddNodeRequest,
  GraphResponse,
  BroadMessageRequest,
  BroadMessageResponse,
  RemoveEdgeRequest,
  AddEdgeRequest
} from "../../proto/generated";
import { GraphNode, Graph, GraphEdge } from "../graph";

const graph = new Graph();
graph.addNode(new GraphNode("A"));
graph.addNode(new GraphNode("B"));
graph.addNode(new GraphNode("C"));

console.log(`Presetted Nodes:\n${graph.print()}`);

const clientStore: {
  [key: string]: grpc.ServerDuplexStream<
    BroadMessageRequest,
    BroadMessageResponse
  >;
} = {};

const broadcast = currentClientId => {
  for (const [clientId, clientCall] of Object.entries(clientStore)) {
    if (clientId === currentClientId) {
      continue;
    }

    const response = new BroadMessageResponse();
    response.setMessage(graph.print());
    clientCall.write(response);
  }
};

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
  addNode(call: grpc.ServerUnaryCall<AddNodeRequest>, callback) {
    const currentClientId = call.getPeer();
    const newNode = new GraphNode(call.request.getKey());
    graph.addNode(newNode);

    const response = new GraphResponse();
    response.setGraph(graph.print());
    callback(null, response);

    broadcast(currentClientId);
  }

  addEdge(call: grpc.ServerUnaryCall<AddEdgeRequest>, callback) {
    const currentClientId = call.getPeer();

    const newEdge = new GraphEdge(
      new GraphNode(call.request.getStartnode()),
      new GraphNode(call.request.getEndnode())
    );
    graph.addEdge(newEdge);

    const response = new GraphResponse();
    response.setGraph(graph.print());
    callback(null, response);

    broadcast(currentClientId);
  }

  removeEdge(call: grpc.ServerUnaryCall<RemoveEdgeRequest>, callback) {
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
