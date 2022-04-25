# nestjs-ipfs-example

Simple Nest.js app that uses IPFS.

## Installation

```bash
$ npm install
```

```bash
$ npm build
```

## Running the app

IPFS instance is required in order to run this app.

This project includes a docker-compose setup to run with a local IPFS: 

```bash
$ npm run start:docker
```

In case IPFS is available on a different end-point, mention it as env variable:

```bash
$ export IPFS_URL=<ipfs-url> npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

