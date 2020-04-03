import * as grpc from "grpc";
import {
  IGraphDispatcherServer,
  AddNodeRequest,
  GraphResponse,
  BroadMessageRequest,
  BroadMessageResponse
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

export class GraphDispatcherHandler implements IGraphDispatcherServer {
  broadcasting(
    call: grpc.ServerDuplexStream<BroadMessageRequest, BroadMessageResponse>
  ) {
    clientStore[call.getPeer()] = call;
  }
  addNode(call: grpc.ServerUnaryCall<AddNodeRequest>, callback) {
    const currentClientId = call.getPeer();
    const newNode = new GraphNode(call.request.getKey());
    graph.addNode(newNode);

    const response = new GraphResponse();
    response.setGraph(graph.print());
    callback(null, response);

    for (const [clientId, clientCall] of Object.entries(clientStore)) {
      if (clientId === currentClientId) {
        continue;
      }

      const response = new BroadMessageResponse();
      response.setMessage(graph.print());
      clientCall.write(response);
    }
  }
  addEdge(call: grpc.ServerUnaryCall<AddNodeRequest>, callback) {
    const currentClientId = call.getPeer();
    const params = call.request.getKey().split(":");
    const newEdge = new GraphEdge(
      new GraphNode(params[0]),
      new GraphNode(params[1])
    );
    graph.addEdge(newEdge);

    const response = new GraphResponse();
    response.setGraph(graph.print());
    callback(null, response);

    for (const [clientId, clientCall] of Object.entries(clientStore)) {
      if (clientId === currentClientId) {
        continue;
      }

      const response = new BroadMessageResponse();
      response.setMessage(graph.print());
      clientCall.write(response);
    }
  }
}
