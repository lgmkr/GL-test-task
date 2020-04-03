import * as grpc from "grpc";
import {
  AddNodeRequest,
  GraphDispatcherClient,
  AddEdgeRequest,
  RemoveEdgeRequest,
  RemoveNodeRequest
} from "../proto/generated";

enum ACTIONS {
  ADD_NODE = "add:node",
  ADD_EDGE = "add:edge",
  REMOVE_EDGE = "remove:edge",
  REMOVE_NODE = "remove:node"
}

export const runActionsDispatcher = (
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

    client.addNode(addNodeRequest, (_, response) => {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }

  if (action === ACTIONS.REMOVE_NODE) {
    const request = new RemoveNodeRequest();
    request.setKey(param);
    client.removeNode(request, (_, response) => {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }

  if (action === ACTIONS.ADD_EDGE) {
    const addEdgeRequest = new AddEdgeRequest();
    const [startNodeKey, endNodeKey] = param.split("_");
    addEdgeRequest.setStartnode(startNodeKey);
    addEdgeRequest.setEndnode(endNodeKey);

    client.addEdge(addEdgeRequest, (_, response) => {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }

  if (action === ACTIONS.REMOVE_EDGE) {
    const [startNodeKey, endNodeKey] = param.split("_");

    const removeEdgeRequest = new RemoveEdgeRequest();
    removeEdgeRequest.setStartnode(startNodeKey);
    removeEdgeRequest.setEndnode(endNodeKey);

    client.removeEdge(removeEdgeRequest, (_, response) => {
      console.log(`Server Response:\n${response.getGraph()}`);
    });
  }
};
