import * as grpc from "grpc";
import { GraphDispatcherService } from "../proto/generated";
import { GraphHandler } from "./handlers";

export const stopServer = (server: grpc.Server): Promise<void> =>
  new Promise((resolve, _) => {
    server.tryShutdown(() => {
      console.log("Server is stopped!");
      resolve();
    });
  });

export const startServer = async (port = 50051): Promise<grpc.Server> => {
  const server: grpc.Server = new grpc.Server();
  server.addService(GraphDispatcherService, new GraphHandler());

  try {
    await new Promise((resolve, reject) => {
      server.bindAsync(
        `127.0.0.1:${port}`,
        grpc.ServerCredentials.createInsecure(),
        (err: Error) => {
          if (err != null) {
            return reject(err);
          }
          resolve(server);
        }
      );
    });
    server.start();
    console.log(`gRPC Server listening on ${port}`);
  } catch (err) {
    console.error(err);
  }
  return server;
};
