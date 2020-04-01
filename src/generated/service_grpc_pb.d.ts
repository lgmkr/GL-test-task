// package: main
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as service_pb from "./service_pb";

interface IGraphDispatcherService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addNode: IGraphDispatcherService_IaddNode;
}

interface IGraphDispatcherService_IaddNode extends grpc.MethodDefinition<service_pb.AddNodeRequest, service_pb.GraphResponse> {
    path: string; // "/main.GraphDispatcher/addNode"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<service_pb.AddNodeRequest>;
    requestDeserialize: grpc.deserialize<service_pb.AddNodeRequest>;
    responseSerialize: grpc.serialize<service_pb.GraphResponse>;
    responseDeserialize: grpc.deserialize<service_pb.GraphResponse>;
}

export const GraphDispatcherService: IGraphDispatcherService;

export interface IGraphDispatcherServer {
    addNode: grpc.handleBidiStreamingCall<service_pb.AddNodeRequest, service_pb.GraphResponse>;
}

export interface IGraphDispatcherClient {
    addNode(): grpc.ClientDuplexStream<service_pb.AddNodeRequest, service_pb.GraphResponse>;
    addNode(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.AddNodeRequest, service_pb.GraphResponse>;
    addNode(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.AddNodeRequest, service_pb.GraphResponse>;
}

export class GraphDispatcherClient extends grpc.Client implements IGraphDispatcherClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addNode(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.AddNodeRequest, service_pb.GraphResponse>;
    public addNode(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.AddNodeRequest, service_pb.GraphResponse>;
}
