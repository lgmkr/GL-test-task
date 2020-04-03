import * as grpc from "grpc";
import { GraphDispatcherClient } from "../proto/generated";
import { runBroadcasting } from "./broadcasting";
import { runActionsDispatcher } from "./actionsDispatcher";

const serverHost = "127.0.0.1:50051";
const args = process.argv.slice(2);

const client = new GraphDispatcherClient(
  serverHost,
  grpc.credentials.createInsecure()
);

runBroadcasting(client);
runActionsDispatcher(client, args);
