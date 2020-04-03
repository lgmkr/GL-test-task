export class GraphNode {
  constructor(private key: string) {
    if (!this.key) {
      throw new Error("Node key isn't defined");
    }
  }

  getKey() {
    return this.key;
  }
}
