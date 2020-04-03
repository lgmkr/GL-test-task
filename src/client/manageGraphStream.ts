import * as grpc from "grpc";
import {
  AddNodeRequest,
  GraphDispatcherClient,
  AddEdgeRequest
} from "../proto/generated";

enum ACTIONS {
  ADD_NODE = "add:node",
  ADD_EDGE = "add:edge"
}

export const runGraphManaging = (
  client: GraphDispatcherClient,
  args: string[]
) => {
  const [action, param] = args;

  if (!action) {
    throw new Error("No action provided!");
  }

  if (action === ACTIONS.ADD_NODE) {
    const addNodeRequest = new AddNodeRequest();
    addNodeRequest.setKey(param);

    client.addNode(addNodeRequest, function(err, response) {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }

  if (action === ACTIONS.ADD_EDGE) {
    const addEdgeRequest = new AddEdgeRequest();
    addEdgeRequest.setKey(param);

    client.addEdge(addEdgeRequest, function(err, response) {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }
};
