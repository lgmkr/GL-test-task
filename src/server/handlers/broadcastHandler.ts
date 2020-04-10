import * as grpc from "grpc";
import {
  BroadMessageRequest,
  BroadMessageResponse,
} from "../../proto/generated";

export const clientStore: {
  [key: string]: grpc.ServerDuplexStream<
    BroadMessageRequest,
    BroadMessageResponse
  >;
} = {};

export const broadcast = (message: string, currentClientId: string) => {
  console.log(`Graph Updated:\n${message}`);

  for (const [clientId, clientCall] of Object.entries(clientStore)) {
    if (clientId === currentClientId) {
      continue;
    }

    const response = new BroadMessageResponse();
    response.setMessage(message);
    clientCall.write(response);
  }
};
