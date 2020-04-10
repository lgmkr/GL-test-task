import { Graph } from "../../../src/server/graph/graph";
import { GraphNode, GraphEdge } from "../../../src/server/graph";

describe("Graph", () => {
  describe("addNode", () => {
    let graph: Graph;
    let nodeA: GraphNode;
    let nodeB: GraphNode;
    let nodeC: GraphNode;

    beforeEach(() => {
      graph = new Graph();
      nodeA = new GraphNode("A");
      nodeB = new GraphNode("B");
      nodeC = new GraphNode("C");
    });

    it("should throw an error for duplicate Node", () => {
      expect(() => {
        graph.addNode(nodeA).addNode(nodeA);
      }).toThrowError("Node A already exists");
    });

    it("should add nodes to graph", () => {
      graph.addNode(nodeA).addNode(nodeB).addNode(nodeC);

      expect(graph.printNodes()).toBe("A,B,C");

      expect(graph.getNodeByKey(nodeA.getKey())).toEqual(nodeA);
      expect(graph.getNodeByKey(nodeB.getKey())).toEqual(nodeB);
      expect(graph.getNodeByKey(nodeC.getKey())).toEqual(nodeC);
    });
  });

  describe("removeNode", () => {
    let graph: Graph;
    beforeEach(() => {
      graph = new Graph();
    });

    it("should throw error when node doesn't exist", () => {
      expect(() => graph.removeNode("A")).toThrowError("Node A doesn't exist");
    });

    it("should be possible to delete nodes and linked edges", () => {
      const nodeA = new GraphNode("A");
      const nodeB = new GraphNode("B");
      const nodeC = new GraphNode("C");

      graph.addNode(nodeA).addNode(nodeB).addNode(nodeC);
      graph
        .addEdge(new GraphEdge(nodeA, nodeB))
        .addEdge(new GraphEdge(nodeA, nodeC));

      let nodeBNeighbors = graph.getNeighbors(nodeB.getKey());
      expect(nodeBNeighbors).toEqual(["A"]);
      let nodeCNeighbors = graph.getNeighbors(nodeC.getKey());
      expect(nodeCNeighbors).toEqual(["A"]);

      graph.removeNode(nodeA.getKey());

      expect(graph.getNodeByKey(nodeA.getKey())).toBeUndefined();

      nodeBNeighbors = graph.getNeighbors(nodeB.getKey());
      expect(nodeBNeighbors).toEqual([]);
      nodeCNeighbors = graph.getNeighbors(nodeC.getKey());
      expect(nodeCNeighbors).toEqual([]);
    });
  });

  describe("addEdge", () => {
    let nodeA: GraphNode;
    let nodeB: GraphNode;
    let edgeAB: GraphEdge;
    let graph: Graph;
    beforeEach(() => {
      graph = new Graph();
      nodeA = new GraphNode("A");
      nodeB = new GraphNode("B");
      edgeAB = new GraphEdge(nodeA, nodeB);
    });

    it("should add edges to graph", () => {
      graph.addEdge(edgeAB);

      let nodeANeighbors = graph.getNeighbors(nodeA.getKey());
      expect(nodeANeighbors).toContain("B");

      let nodeBNeighbors = graph.getNeighbors(nodeB.getKey());
      expect(nodeBNeighbors).toContain("A");
    });

    it("should throw an error when trying to add edge twice", () => {
      expect(() => graph.addEdge(edgeAB).addEdge(edgeAB)).toThrowError(
        "Edge already exists"
      );
    });
  });

  describe("removeEdge", () => {
    let nodeA: GraphNode;
    let nodeB: GraphNode;
    let graph: Graph;

    beforeEach(() => {
      graph = new Graph();

      nodeA = new GraphNode("A");
      nodeB = new GraphNode("B");
      const edgeAB = new GraphEdge(nodeA, nodeB);

      graph.addEdge(edgeAB);

      graph.removeEdge(nodeA.getKey(), nodeB.getKey());
    });

    it("should throw an error in edge doesn't exist", () => {
      expect(() => {
        graph.removeEdge(nodeA.getKey(), nodeB.getKey());
      }).toThrowError("Graph has no A_B edge");
    });

    it("should delete connected nodes", () => {
      let nodeANeighbors = graph.getNeighbors(nodeA.getKey());
      expect(nodeANeighbors).not.toContain("B");

      let nodeBNeighbors = graph.getNeighbors(nodeB.getKey());
      expect(nodeBNeighbors).not.toContain("A");
    });
  });
});
