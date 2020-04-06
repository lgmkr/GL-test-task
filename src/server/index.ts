import { startServer, stopServer } from "./server";

(async () => {
  const server = await startServer();

  process.on("SIGINT", async () => {
    await stopServer(server);
  });
})();
