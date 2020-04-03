import { GraphNode } from "./graphNode";
import { GraphEdge } from "./graphEdge";

export class Graph {
  private nodes: { [key: string]: GraphNode } = {};
  private edges: { [key: string]: GraphEdge } = {};
  private adjList: Map<string, string[]> = new Map();

  constructor() {}

  addNode(newNode: GraphNode): Graph {
    const key = newNode.getKey();
    this.adjList.set(key, []);
    this.nodes[key] = newNode;
    return this;
  }

  getNodeByKey(key: string) {
    return this.nodes[key];
  }

  getAllNodes() {
    return Object.values(this.nodes);
  }

  addEdge(edge: GraphEdge): Graph {
    let startNode = this.getNodeByKey(edge.startNode.getKey());
    let endNode = this.getNodeByKey(edge.endNode.getKey());

    if (!startNode) {
      this.addNode(edge.startNode);
      startNode = this.getNodeByKey(edge.startNode.getKey());
    }

    if (!endNode) {
      this.addNode(edge.endNode);
      endNode = this.getNodeByKey(edge.endNode.getKey());
    }

    if (this.edges[edge.getKey()]) {
      throw new Error("Edge already exists");
    } else {
      this.edges[edge.getKey()] = edge;
    }

    this.adjList.get(startNode.getKey())!.push(endNode.getKey());
    this.adjList.get(endNode.getKey())!.push(startNode.getKey());

    return this;
  }

  removeEdge(startNodeKey: string, endNodeKey: string) {
    if (!this.nodes[startNodeKey]) {
      throw new Error(`Node ${startNodeKey} node doesn't exist`);
    }

    if (!this.nodes[endNodeKey]) {
      throw new Error(`Node ${endNodeKey} node doesn't exist`);
    }

    const startNodeList = this.adjList.get(startNodeKey);
    this.adjList.set(
      startNodeKey,
      startNodeList!.filter(node => node !== endNodeKey)
    );

    const endNodeList = this.adjList.get(endNodeKey);
    this.adjList.set(
      endNodeKey,
      endNodeList!.filter(node => node !== startNodeKey)
    );
  }

  printNodes() {
    return Object.keys(this.nodes).toString();
  }

  print() {
    const keys = this.adjList.keys();
    let canvas = "";
    for (const key of keys) {
      const values = this.adjList.get(key);
      let text = "";
      if (values) {
        for (const value of values) {
          text += value + ", ";
        }

        canvas += `${key} -> ${text}\n`;
      }
    }

    return canvas;
  }
}
