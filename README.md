# gRPC + Managing Graph Example

## Prerequisites

Implemented Graph is undirected without weights.

Implemented Graph is represented as adjacency list.

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

- add:node - Adds node to the graph

Example: `npm run add:node A`

- remove:node - Remove node from thee graph (not implemented yet)

- add:edge - Adds edge to the graph

Example: `npm run add:node A:B`

- remove:edge - Remove edge from thee graph (not implemented yet)

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

Note: Not implemented yet
