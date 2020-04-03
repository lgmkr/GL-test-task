import * as grpc from "grpc";
import {
  AddNodeRequest,
  GraphDispatcherClient,
  AddEdgeRequest,
  RemoveEdgeRequest
} from "../proto/generated";

enum ACTIONS {
  ADD_NODE = "add:node",
  ADD_EDGE = "add:edge",
  REMOVE_EDGE = "remove:edge"
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

    client.addNode(addNodeRequest, (err, response) => {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }

  if (action === ACTIONS.ADD_EDGE) {
    const addEdgeRequest = new AddEdgeRequest();
    const [startNodeKey, endNodeKey] = param.split("_");
    addEdgeRequest.setStartnode(startNodeKey);
    addEdgeRequest.setEndnode(endNodeKey);

    client.addEdge(addEdgeRequest, (err, response) => {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }

  if (action === ACTIONS.REMOVE_EDGE) {
    const [startNodeKey, endNodeKey] = param.split("_");

    const removeEdgeRequest = new RemoveEdgeRequest();
    removeEdgeRequest.setStartnode(startNodeKey);
    removeEdgeRequest.setEndnode(endNodeKey);

    client.removeEdge(removeEdgeRequest, (err, response) => {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }
};
