import { GraphNode } from "./graphNode";

export class GraphEdge {
  constructor(public startNode: GraphNode, public endNode: GraphNode) {}

  getKey() {
    return `${this.startNode.getKey()}_${this.endNode.getKey()}`;
  }
}
