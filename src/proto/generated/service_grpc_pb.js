// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_pb = require('./service_pb.js');

function serialize_main_AddEdgeRequest(arg) {
  if (!(arg instanceof service_pb.AddEdgeRequest)) {
    throw new Error('Expected argument of type main.AddEdgeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_AddEdgeRequest(buffer_arg) {
  return service_pb.AddEdgeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_AddNodeRequest(arg) {
  if (!(arg instanceof service_pb.AddNodeRequest)) {
    throw new Error('Expected argument of type main.AddNodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_AddNodeRequest(buffer_arg) {
  return service_pb.AddNodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_AddNodeResponse(arg) {
  if (!(arg instanceof service_pb.AddNodeResponse)) {
    throw new Error('Expected argument of type main.AddNodeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_AddNodeResponse(buffer_arg) {
  return service_pb.AddNodeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_BroadMessageRequest(arg) {
  if (!(arg instanceof service_pb.BroadMessageRequest)) {
    throw new Error('Expected argument of type main.BroadMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_BroadMessageRequest(buffer_arg) {
  return service_pb.BroadMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_BroadMessageResponse(arg) {
  if (!(arg instanceof service_pb.BroadMessageResponse)) {
    throw new Error('Expected argument of type main.BroadMessageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_BroadMessageResponse(buffer_arg) {
  return service_pb.BroadMessageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_GraphResponse(arg) {
  if (!(arg instanceof service_pb.GraphResponse)) {
    throw new Error('Expected argument of type main.GraphResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_GraphResponse(buffer_arg) {
  return service_pb.GraphResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_RemoveEdgeRequest(arg) {
  if (!(arg instanceof service_pb.RemoveEdgeRequest)) {
    throw new Error('Expected argument of type main.RemoveEdgeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_RemoveEdgeRequest(buffer_arg) {
  return service_pb.RemoveEdgeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_RemoveNodeRequest(arg) {
  if (!(arg instanceof service_pb.RemoveNodeRequest)) {
    throw new Error('Expected argument of type main.RemoveNodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_RemoveNodeRequest(buffer_arg) {
  return service_pb.RemoveNodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GraphDispatcherService = exports.GraphDispatcherService = {
  broadcasting: {
    path: '/main.GraphDispatcher/broadcasting',
    requestStream: true,
    responseStream: true,
    requestType: service_pb.BroadMessageRequest,
    responseType: service_pb.BroadMessageResponse,
    requestSerialize: serialize_main_BroadMessageRequest,
    requestDeserialize: deserialize_main_BroadMessageRequest,
    responseSerialize: serialize_main_BroadMessageResponse,
    responseDeserialize: deserialize_main_BroadMessageResponse,
  },
  addNode: {
    path: '/main.GraphDispatcher/addNode',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.AddNodeRequest,
    responseType: service_pb.AddNodeResponse,
    requestSerialize: serialize_main_AddNodeRequest,
    requestDeserialize: deserialize_main_AddNodeRequest,
    responseSerialize: serialize_main_AddNodeResponse,
    responseDeserialize: deserialize_main_AddNodeResponse,
  },
  removeNode: {
    path: '/main.GraphDispatcher/removeNode',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.RemoveNodeRequest,
    responseType: service_pb.GraphResponse,
    requestSerialize: serialize_main_RemoveNodeRequest,
    requestDeserialize: deserialize_main_RemoveNodeRequest,
    responseSerialize: serialize_main_GraphResponse,
    responseDeserialize: deserialize_main_GraphResponse,
  },
  addEdge: {
    path: '/main.GraphDispatcher/addEdge',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.AddEdgeRequest,
    responseType: service_pb.GraphResponse,
    requestSerialize: serialize_main_AddEdgeRequest,
    requestDeserialize: deserialize_main_AddEdgeRequest,
    responseSerialize: serialize_main_GraphResponse,
    responseDeserialize: deserialize_main_GraphResponse,
  },
  removeEdge: {
    path: '/main.GraphDispatcher/removeEdge',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.RemoveEdgeRequest,
    responseType: service_pb.GraphResponse,
    requestSerialize: serialize_main_RemoveEdgeRequest,
    requestDeserialize: deserialize_main_RemoveEdgeRequest,
    responseSerialize: serialize_main_GraphResponse,
    responseDeserialize: deserialize_main_GraphResponse,
  },
};

exports.GraphDispatcherClient = grpc.makeGenericClientConstructor(GraphDispatcherService);
