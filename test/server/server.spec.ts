import { Server } from "grpc";
import { startServer, stopServer } from "../../src/server/server";
import { GraphDispatcherService } from "../../src/proto/generated";
import { GraphHandler } from "../../src/server/handlers/graphHandler";

const addServiceSpy = jest.spyOn(Server.prototype, "addService");
const bindAsyncSpy = jest.spyOn(Server.prototype, "bindAsync");
const startSpy = jest.spyOn(Server.prototype, "addService");

describe("startServer", () => {
  let server: Server;

  beforeEach(async () => {
    server = await startServer(50052);
  });

  afterEach(async () => {
    await stopServer(server);
  });

  it("should start server", async () => {
    expect(addServiceSpy).toBeCalledTimes(1);
    expect(addServiceSpy).toBeCalledWith(
      GraphDispatcherService,
      new GraphHandler()
    );

    expect(bindAsyncSpy).toBeCalledTimes(1);
    expect(startSpy).toBeCalledTimes(1);
  });
});
