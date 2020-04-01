// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_pb = require('./service_pb.js');

function serialize_main_AddNodeRequest(arg) {
  if (!(arg instanceof service_pb.AddNodeRequest)) {
    throw new Error('Expected argument of type main.AddNodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_AddNodeRequest(buffer_arg) {
  return service_pb.AddNodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
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


var GraphDispatcherService = exports.GraphDispatcherService = {
  addNode: {
    path: '/main.GraphDispatcher/addNode',
    requestStream: true,
    responseStream: true,
    requestType: service_pb.AddNodeRequest,
    responseType: service_pb.GraphResponse,
    requestSerialize: serialize_main_AddNodeRequest,
    requestDeserialize: deserialize_main_AddNodeRequest,
    responseSerialize: serialize_main_GraphResponse,
    responseDeserialize: deserialize_main_GraphResponse,
  },
};

exports.GraphDispatcherClient = grpc.makeGenericClientConstructor(GraphDispatcherService);
