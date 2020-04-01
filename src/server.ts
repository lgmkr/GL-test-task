import * as grpc from "grpc";
import { GraphDispatcherService } from "./generated";
import { GraphDispatcherHandler } from "./handlers/graphDispatcher";

const port: string | number = process.env.PORT || 50051;

export const startServer = (): void => {
  const server: grpc.Server = new grpc.Server();
  server.addService(GraphDispatcherService, new GraphDispatcherHandler());

  server.bindAsync(
    `127.0.0.1:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err: Error, port: number) => {
      if (err != null) {
        return console.error(err);
      }
      console.log(`gRPC Server listening on ${port}`);
    }
  );
  server.start();
};

startServer();
