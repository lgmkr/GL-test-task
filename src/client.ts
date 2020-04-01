import * as grpc from "grpc";
import {
  GraphDispatcherClient,
  AddNodeRequest,
  GraphResponse
} from "./generated";

const serverHost = "127.0.0.1:50051";
const args = process.argv.slice(2);

const client = new GraphDispatcherClient(
  serverHost,
  grpc.credentials.createInsecure()
);

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

stream.end();
