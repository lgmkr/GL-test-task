// package: main
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class BroadMessageRequest extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BroadMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BroadMessageRequest): BroadMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BroadMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BroadMessageRequest;
    static deserializeBinaryFromReader(message: BroadMessageRequest, reader: jspb.BinaryReader): BroadMessageRequest;
}

export namespace BroadMessageRequest {
    export type AsObject = {
        message: string,
    }
}

export class BroadMessageResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BroadMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BroadMessageResponse): BroadMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BroadMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BroadMessageResponse;
    static deserializeBinaryFromReader(message: BroadMessageResponse, reader: jspb.BinaryReader): BroadMessageResponse;
}

export namespace BroadMessageResponse {
    export type AsObject = {
        message: string,
    }
}

export class GraphResponse extends jspb.Message { 
    getNodes(): string;
    setNodes(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GraphResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GraphResponse): GraphResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GraphResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GraphResponse;
    static deserializeBinaryFromReader(message: GraphResponse, reader: jspb.BinaryReader): GraphResponse;
}

export namespace GraphResponse {
    export type AsObject = {
        nodes: string,
    }
}

export class AddNodeRequest extends jspb.Message { 
    getKey(): string;
    setKey(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddNodeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddNodeRequest): AddNodeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddNodeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddNodeRequest;
    static deserializeBinaryFromReader(message: AddNodeRequest, reader: jspb.BinaryReader): AddNodeRequest;
}

export namespace AddNodeRequest {
    export type AsObject = {
        key: string,
    }
}
