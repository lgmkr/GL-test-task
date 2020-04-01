import * as grpc from "grpc";
import {
  IGraphDispatcherServer,
  AddNodeRequest,
  GraphResponse
} from "../generated";
import { GraphNode, Graph } from "../graph";

const graph = new Graph();
graph.addNode(new GraphNode("A"));
graph.addNode(new GraphNode("B"));
graph.addNode(new GraphNode("C"));

console.log(`Presetted Nodes: ${graph.print()}`);

export class GraphDispatcherHandler implements IGraphDispatcherServer {
  addNode(call: grpc.ServerDuplexStream<AddNodeRequest, GraphResponse>) {
    call.on("data", (request: AddNodeRequest) => {
      const newNode = new GraphNode(request.getKey());
      graph.addNode(newNode);

      console.log("New node added: ", newNode.getKey());

      const response = new GraphResponse();
      response.setNodes(graph.print());
      call.write(response);
    });
  }

  // getHellous() {
  //   call.on("data", (request: HelloRequest) => {
  //     console.log("call peer: ", call.getPeer());

  //     const reply = new HelloResponse();
  //     reply.setMessage(`Hello ${request.getName()} from server`);

  //     console.log("req: ", request.toObject());

  //     call.write(reply);
  //   });
  //   call.on("end", () => {
  //     console.log("end");
  //     call.end();
  //   });
  // }
}
