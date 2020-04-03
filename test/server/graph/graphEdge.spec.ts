import { GraphNode, GraphEdge } from "../../../src/server/graph";

describe("GraphEdge", () => {
  it("should create graph edge", () => {
    const startNode = new GraphNode("A");
    const endNode = new GraphNode("B");
    const edge = new GraphEdge(startNode, endNode);

    expect(edge.getKey()).toBe("A_B");
    expect(edge.startNode).toEqual(startNode);
    expect(edge.endNode).toEqual(endNode);
  });
});
