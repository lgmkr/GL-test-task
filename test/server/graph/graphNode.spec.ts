import { GraphNode } from "../../../src/server/graph";

describe("GraphNode", () => {
  it("should create graph node", () => {
    const node = new GraphNode("A");

    expect(node).toBeDefined();
    expect(node.getKey()).toBe("A");
  });
});
