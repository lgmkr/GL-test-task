import { GraphNode } from "./graphNode";
import { GraphEdge } from "./graphEdge";

export class Graph {
  private nodes: { [key: string]: GraphNode } = {};
  private edges: { [key: string]: GraphEdge } = {};

  private adjList: Map<string, string[]> = new Map();

  constructor() {}

  addNode(newNode: GraphNode): Graph {
    const key = newNode.getKey();

    if (this.isNodePresented(key)) {
      throw new Error(`Node ${key} already exists`);
    }

    this.adjList.set(key, []);
    this.nodes[key] = newNode;
    return this;
  }

  isNodePresented(key: string): boolean {
    return this.adjList.has(key);
  }

  removeNode(nodeKey: string): Graph {
    if (!this.nodes[nodeKey]) {
      throw new Error(`Node ${nodeKey} doesn't exist`);
    }
    delete this.nodes[nodeKey];

    // {
    // "A": ["B", "C"]
    // }
    const neighbors = this.getNeighbors(nodeKey);
    if (!neighbors) {
      throw new Error(`Node ${nodeKey} doesn't exist`);
    }

    for (let neighborNode of neighbors) {
      const nodeInList = this.adjList.get(neighborNode);
      this.adjList.set(
        neighborNode,
        nodeInList!.filter((node) => node !== nodeKey)
      );
    }
    this.adjList.delete(nodeKey);

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

  getNeighbors(nodeKey: string) {
    return this.adjList.get(nodeKey);
  }

  removeEdge(startNodeKey: string, endNodeKey: string) {
    if (!this.isNodePresented(startNodeKey)) {
      throw new Error(`Node ${startNodeKey} doesn't exist`);
    }

    if (!this.isNodePresented(endNodeKey)) {
      throw new Error(`Node ${endNodeKey} doesn't exist`);
    }

    if (
      !this.getNeighbors(startNodeKey)!.includes(endNodeKey) &&
      !this.getNeighbors(endNodeKey)!.includes(startNodeKey)
    ) {
      throw new Error(`Graph has no ${startNodeKey}_${endNodeKey} edge`);
    }

    const startNodeList = this.getNeighbors(startNodeKey);
    this.adjList.set(
      startNodeKey,
      startNodeList!.filter((node) => node !== endNodeKey)
    );

    const endNodeList = this.getNeighbors(endNodeKey);
    this.adjList.set(
      endNodeKey,
      endNodeList!.filter((node) => node !== startNodeKey)
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
