import * as grpc from "grpc";
import { BroadMessageRequest, BroadMessageResponse } from "../proto/generated";

export const runBroadcasting = client => {
  const broadcastingStream: grpc.ClientDuplexStream<
    BroadMessageRequest,
    BroadMessageResponse
  > = client.broadcasting();

  broadcastingStream.on("data", (data: BroadMessageResponse) => {
    console.log(`Broadcasting: Updated Graph:\n${data.getMessage()}`);
  });

  broadcastingStream.on("end", () => {
    console.log("Broadcasting: Bye");
  });

  const broadMessageRequest = new BroadMessageRequest();
  broadMessageRequest.setMessage("Broadcasting: Hello Server");

  broadcastingStream.write(broadMessageRequest);
};
