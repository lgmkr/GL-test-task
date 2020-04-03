import { Graph } from "../../../src/server/graph/graph";
import { GraphNode, GraphEdge } from "../../../src/server/graph";

describe("Graph", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });

  it("should add nodes to graph", () => {
    const nodeA = new GraphNode("A");
    const nodeB = new GraphNode("B");
    const nodeC = new GraphNode("C");

    graph
      .addNode(nodeA)
      .addNode(nodeB)
      .addNode(nodeC);

    expect(graph.printNodes()).toBe("A,B,C");

    expect(graph.getNodeByKey(nodeA.getKey())).toEqual(nodeA);
    expect(graph.getNodeByKey(nodeB.getKey())).toEqual(nodeB);
    expect(graph.getNodeByKey(nodeC.getKey())).toEqual(nodeC);
  });

  it("should add edges to graph", () => {
    const nodeA = new GraphNode("A");
    const nodeB = new GraphNode("B");

    const edgeAB = new GraphEdge(nodeA, nodeB);

    graph.addEdge(edgeAB);

    expect(graph.getAllNodes().length).toBe(2);
    expect(graph.getAllNodes()[0]).toEqual(nodeA);
    expect(graph.getAllNodes()[1]).toEqual(nodeB);
  });

  it("should throw an error when trying to add edge twice", () => {
    const vertexA = new GraphNode("A");
    const vertexB = new GraphNode("B");

    const edgeAB = new GraphEdge(vertexA, vertexB);

    expect(() => graph.addEdge(edgeAB).addEdge(edgeAB)).toThrowError(
      "Edge already exists"
    );
  });

  it.todo("should be possible to delete edges");
  it.todo("should be possible to delete nodes");
});
