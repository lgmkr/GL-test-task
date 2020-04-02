import * as grpc from "grpc";
import {
  IGraphDispatcherServer,
  AddNodeRequest,
  GraphResponse,
  BroadMessageRequest,
  BroadMessageResponse
} from "../../proto/generated";
import { GraphNode, Graph } from "../graph";

const graph = new Graph();
graph.addNode(new GraphNode("A"));
graph.addNode(new GraphNode("B"));
graph.addNode(new GraphNode("C"));

console.log(`Presetted Nodes: ${graph.print()}`);

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
  addNode(call: grpc.ServerDuplexStream<AddNodeRequest, GraphResponse>) {
    call.on("data", (request: AddNodeRequest) => {
      const currentClientId = call.getPeer();

      const newNode = new GraphNode(request.getKey());
      graph.addNode(newNode);

      const response = new GraphResponse();
      response.setNodes(graph.print());
      call.write(response);

      for (const [clientId, clientCall] of Object.entries(clientStore)) {
        if (clientId === currentClientId) {
          continue;
        }

        const response = new BroadMessageResponse();
        response.setMessage(graph.print());
        clientCall.write(response);
      }
    });
  }
}
