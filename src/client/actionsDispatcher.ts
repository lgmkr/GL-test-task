import * as grpc from "grpc";
import {
  AddNodeRequest,
  GraphDispatcherClient,
  AddEdgeRequest,
  RemoveEdgeRequest,
  RemoveNodeRequest,
  GraphResponse,
} from "../proto/generated";

export enum ACTIONS {
  ADD_NODE = "add:node",
  ADD_EDGE = "add:edge",
  REMOVE_EDGE = "remove:edge",
  REMOVE_NODE = "remove:node",
}

const callbackWrapper = (
  error: grpc.ServiceError | null,
  response: GraphResponse
) => {
  if (error) {
    console.log(`${error.name}, ${error.message}`);
    return;
  }
  console.log(`Server Response:\n${response.getGraph()}`);
};

const actionsDispatcher = (
  client: GraphDispatcherClient,
  action: string,
  param: string
) => {
  switch (action) {
    case ACTIONS.ADD_NODE:
      const addNodeRequest = new AddNodeRequest();
      addNodeRequest.setKey(param);

      client.addNode(addNodeRequest, callbackWrapper);
      break;
    case ACTIONS.REMOVE_NODE:
      const request = new RemoveNodeRequest();
      request.setKey(param);
      client.removeNode(request, callbackWrapper);
      break;
    case ACTIONS.ADD_EDGE:
      var [startNodeKey, endNodeKey] = param.split("_");
      const addEdgeRequest = new AddEdgeRequest();
      addEdgeRequest.setStartnode(startNodeKey);
      addEdgeRequest.setEndnode(endNodeKey);

      client.addEdge(addEdgeRequest, callbackWrapper);
      break;
    case ACTIONS.REMOVE_EDGE:
      var [startNodeKey, endNodeKey] = param.split("_");
      const removeEdgeRequest = new RemoveEdgeRequest();
      removeEdgeRequest.setStartnode(startNodeKey);
      removeEdgeRequest.setEndnode(endNodeKey);

      client.removeEdge(removeEdgeRequest, callbackWrapper);
      break;
  }
};

export const runActionsDispatcher = (
  client: GraphDispatcherClient,
  args: string[]
) => {
  const [action, param] = args;

  if (!action) {
    throw new Error("No action provided!");
  }

  actionsDispatcher(client, action, param);
};
