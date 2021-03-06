# gRPC + Managing Graph Example

## Prerequisites

Implemented Graph is undirected without weights.

Implemented Graph represents an adjacency list.

## Installing

```bash
npm install
```

## Using

1. Transform protobuff to JS and TS definition files

```bash
npm run proto: generate
```

2. Run server

```bash
npm run server
```

3. Run client

```bash
npm run client <action> <param1>
```

Actions:

- **add:node** - Adds node to the graph

Example: `npm run add:node A`

- **remove:node** - Remove node from thee graph _(note: not implemented yet)_

- **add:edge** - Adds edge to the graph

Example: `npm run add:node A_B`

- **remove:edge** - Remove edge from thee graph

Example: `npm run remove:node A_B`

## Working scenario

1. Start server

```
$ npm run server

Presetted Nodes:
A ->
B ->
C ->

gRPC Server listening on 50051
```

2. In different terminals start several clients

```bash
# terminal 1
$ npm run client add:node B

Server Response:
A ->
B ->
C ->
H ->

# terminal 2
$ npm run client add:edge A:B

Server Response:
A -> B,
B -> A,
C ->
H ->

#terminal (arrived broadcast message)
Broadcasting: Updated Graph:
A -> B,
B -> A,
C ->
H ->

```

## Testing

```bash
npm test
```

or in watch mode

```
npm run test:watch
```

## Roadmap

- Every client should provide prompt to actions and params (cli)
- Remove disconnected clients from stored clients list
- Get rid of callbacks in GraphDispatcherHandler (client: grpc-promise package)
