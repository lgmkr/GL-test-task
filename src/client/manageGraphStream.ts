import * as grpc from "grpc";
import { AddNodeRequest, GraphResponse } from "../proto/generated";

export const runGraphManaging = (client, args) => {
  const stream: grpc.ClientDuplexStream<
    AddNodeRequest,
    GraphResponse
  > = client.addNode();

  stream.on("data", (data: GraphResponse) => {
    console.log(`Graph nodes: ${JSON.stringify(data.getNodes())}`);
  });

  stream.on("end", () => {
    console.log("Bye");
  });

  for (const key of args) {
    const req = new AddNodeRequest();
    req.setKey(key);
    stream.write(req);
  }
};
