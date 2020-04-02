import { GraphNode } from "./graphNode";
import { GraphEdge } from "./graphEdge";

export class Graph {
  private vertices: { [key: string]: GraphNode } = {};
  private edges: { [key: string]: GraphEdge } = {};

  constructor() {}

  addNode(newNode: GraphNode) {
    this.vertices[newNode.getKey()] = newNode;
    return this;
  }

  addEdge() {}

  print() {
    return Object.keys(this.vertices).toString();
  }
}
