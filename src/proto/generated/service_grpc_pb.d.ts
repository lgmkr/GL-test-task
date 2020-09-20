// package: main
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as service_pb from "./service_pb";

interface IGraphDispatcherService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    broadcasting: IGraphDispatcherService_Ibroadcasting;
    addNode: IGraphDispatcherService_IaddNode;
    removeNode: IGraphDispatcherService_IremoveNode;
    addEdge: IGraphDispatcherService_IaddEdge;
    removeEdge: IGraphDispatcherService_IremoveEdge;
}

interface IGraphDispatcherService_Ibroadcasting extends grpc.MethodDefinition<service_pb.BroadMessageRequest, service_pb.BroadMessageResponse> {
    path: string; // "/main.GraphDispatcher/broadcasting"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<service_pb.BroadMessageRequest>;
    requestDeserialize: grpc.deserialize<service_pb.BroadMessageRequest>;
    responseSerialize: grpc.serialize<service_pb.BroadMessageResponse>;
    responseDeserialize: grpc.deserialize<service_pb.BroadMessageResponse>;
}
interface IGraphDispatcherService_IaddNode extends grpc.MethodDefinition<service_pb.AddNodeRequest, service_pb.AddNodeResponse> {
    path: string; // "/main.GraphDispatcher/addNode"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<service_pb.AddNodeRequest>;
    requestDeserialize: grpc.deserialize<service_pb.AddNodeRequest>;
    responseSerialize: grpc.serialize<service_pb.AddNodeResponse>;
    responseDeserialize: grpc.deserialize<service_pb.AddNodeResponse>;
}
interface IGraphDispatcherService_IremoveNode extends grpc.MethodDefinition<service_pb.RemoveNodeRequest, service_pb.GraphResponse> {
    path: string; // "/main.GraphDispatcher/removeNode"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<service_pb.RemoveNodeRequest>;
    requestDeserialize: grpc.deserialize<service_pb.RemoveNodeRequest>;
    responseSerialize: grpc.serialize<service_pb.GraphResponse>;
    responseDeserialize: grpc.deserialize<service_pb.GraphResponse>;
}
interface IGraphDispatcherService_IaddEdge extends grpc.MethodDefinition<service_pb.AddEdgeRequest, service_pb.GraphResponse> {
    path: string; // "/main.GraphDispatcher/addEdge"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<service_pb.AddEdgeRequest>;
    requestDeserialize: grpc.deserialize<service_pb.AddEdgeRequest>;
    responseSerialize: grpc.serialize<service_pb.GraphResponse>;
    responseDeserialize: grpc.deserialize<service_pb.GraphResponse>;
}
interface IGraphDispatcherService_IremoveEdge extends grpc.MethodDefinition<service_pb.RemoveEdgeRequest, service_pb.GraphResponse> {
    path: string; // "/main.GraphDispatcher/removeEdge"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<service_pb.RemoveEdgeRequest>;
    requestDeserialize: grpc.deserialize<service_pb.RemoveEdgeRequest>;
    responseSerialize: grpc.serialize<service_pb.GraphResponse>;
    responseDeserialize: grpc.deserialize<service_pb.GraphResponse>;
}

export const GraphDispatcherService: IGraphDispatcherService;

export interface IGraphDispatcherServer {
    broadcasting: grpc.handleBidiStreamingCall<service_pb.BroadMessageRequest, service_pb.BroadMessageResponse>;
    addNode: grpc.handleUnaryCall<service_pb.AddNodeRequest, service_pb.AddNodeResponse>;
    removeNode: grpc.handleUnaryCall<service_pb.RemoveNodeRequest, service_pb.GraphResponse>;
    addEdge: grpc.handleUnaryCall<service_pb.AddEdgeRequest, service_pb.GraphResponse>;
    removeEdge: grpc.handleUnaryCall<service_pb.RemoveEdgeRequest, service_pb.GraphResponse>;
}

export interface IGraphDispatcherClient {
    broadcasting(): grpc.ClientDuplexStream<service_pb.BroadMessageRequest, service_pb.BroadMessageResponse>;
    broadcasting(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.BroadMessageRequest, service_pb.BroadMessageResponse>;
    broadcasting(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.BroadMessageRequest, service_pb.BroadMessageResponse>;
    addNode(request: service_pb.AddNodeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.AddNodeResponse) => void): grpc.ClientUnaryCall;
    addNode(request: service_pb.AddNodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.AddNodeResponse) => void): grpc.ClientUnaryCall;
    addNode(request: service_pb.AddNodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.AddNodeResponse) => void): grpc.ClientUnaryCall;
    removeNode(request: service_pb.RemoveNodeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    removeNode(request: service_pb.RemoveNodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    removeNode(request: service_pb.RemoveNodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    addEdge(request: service_pb.AddEdgeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    addEdge(request: service_pb.AddEdgeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    addEdge(request: service_pb.AddEdgeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    removeEdge(request: service_pb.RemoveEdgeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    removeEdge(request: service_pb.RemoveEdgeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    removeEdge(request: service_pb.RemoveEdgeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
}

export class GraphDispatcherClient extends grpc.Client implements IGraphDispatcherClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public broadcasting(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.BroadMessageRequest, service_pb.BroadMessageResponse>;
    public broadcasting(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.BroadMessageRequest, service_pb.BroadMessageResponse>;
    public addNode(request: service_pb.AddNodeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.AddNodeResponse) => void): grpc.ClientUnaryCall;
    public addNode(request: service_pb.AddNodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.AddNodeResponse) => void): grpc.ClientUnaryCall;
    public addNode(request: service_pb.AddNodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.AddNodeResponse) => void): grpc.ClientUnaryCall;
    public removeNode(request: service_pb.RemoveNodeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public removeNode(request: service_pb.RemoveNodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public removeNode(request: service_pb.RemoveNodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public addEdge(request: service_pb.AddEdgeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public addEdge(request: service_pb.AddEdgeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public addEdge(request: service_pb.AddEdgeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public removeEdge(request: service_pb.RemoveEdgeRequest, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public removeEdge(request: service_pb.RemoveEdgeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
    public removeEdge(request: service_pb.RemoveEdgeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.GraphResponse) => void): grpc.ClientUnaryCall;
}
