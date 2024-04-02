# NodeJS Typescript Transformer Example Repository

This repository contains a simple example of a NodeJS Typescript Transformer.

## Entrypoint

The `main.ts` file is the entrypoint for the transformer. It contains the following endpoints:

### GET /health

This endpoint is used by the transformer shell to check if the transformer is healthy.

### POST /transform

This endpoint is used by the transformer shell to transform data.

## 📝 Quick start

### 📑 Generate your own repository from this template

<img alt="Create a new repo from the template" src="./.github/readme/create-repo-from-template.gif" width="900" />
<br/>

## 🚀 Deployment

We try to simplify your development experience, by including a pipeline that will automatically test, build and push the
release artifact to the GitHub release. However, if you wish to modify the GitHub Action workflow, or use your own, you
are completely free to do so.

### 🔧 Preparing our pre-made Pipeline

Before you can utilise our pre-built pipeline, you need to authenticate yourself with it. This is done by:

1. generating a personal access token with the permission of creating artifacts.
2. adding a `new repository secret` to your `Settings > Secrets and variables > Actions`, with the name
   of `RELEASE_GITHUB_TOKEN`, and the value of your newly created personal token

You can follow our step-by-step video guide, if you are not accustomed to this process:

[Automating the release process for your Transformer with GitHub Actions](https://youtu.be/QveUgYLJWe8)

### 1️⃣.2️⃣.0️⃣ Release Artifact Versioning

We utilise [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) to automatically manage the
versioning of your released artifacts. In short:

- prefixing your commits with `feat: ` will trigger a minor version (1.**2**.0)
- prefixing your commits with `fix: ` will trigger a patch version (1.0.**3**)

As an example: `feat: splitting email into username and domain`, or `fix: email now splits correctly by @ symbol`

If you need anything more granular, then you can refer to the link above.

### 🔄 Release Process

If using the correct [conventional commit syntax](#120-release-artifact-versioning), then the release process is as
follows:

Anything that gets pushed to the `main` branch, will trigger a pull request; that runs tests to validate the release.
Once the pull request has been merged the release will be published, together with the artifact.

## 💻 Development

We have **2 recommended methods** of working on your transformer.

1. [Develop it directly from GitHub](#option-1-develop-directly-in-github-simple)
2. [Run it locally]()

Your choice may vary depending on your development environment, preference and/or complexity.

### Option 1: Develop directly in GitHub (Simple)

> You can look at how you start the editor directly in your browser [here](https://github.com/github/dev).

Make your changes
and [push them to your repository](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git#_staging-and-committing-code-changes).
**Bear in mind** that you need to use conventional commits to be able to release your transformer. You can read more
about
it under [Deployment](#-deployment).

### Option B: Develop locally (Advanced)

### 1. ⚙️ Installation️

> Prerequisites:
> - NodeJS
> - Docker
>
> And you must clone the project on to your machine

install dependencies:

```bash
yarn install && yarn build
```

run the transformer shell

```bash
docker-compose -f test/docker/docker-compose.yaml up -d
```

Create a .env file with the following content:

```bash
HOST_ADDRESS=host.docker.internal
```

### 2. 💻 Development

To start developing with watch mode run:

```bash
yarn build:watch
```

In another terminal or tab, run:

```bash
yarn test:watch
```

to run the tests on the built transformer.

When changes are made any of the files the transformer will be reloaded and the tests will be run again.

> **Note**: The dist directory needs to be writable by the transformer shell.

## 🔎 Development Overview

### Change the transformer

To change the transformer, edit the `transform.entrypoint.ts` file. To add functionality on startup edit
the `start.entrypoint.ts` file. To add additional health checks edit the `health.entrypoint.ts` file.

### Change the input and output data

To change the validation of inputs and outputs edit the `test/expected.json` file. This file specify the event payloads
that are sent to the transformer and the expected output. The `:uuid:` and `:date:` values for the expected outcome
matches to any string.

### Further customization

Change the `test/app.spec.ts` file to add additional tests and more advanced validation. Further change the files in
the `src` directory to add more advanced logic.

## 🌕 Utilise your Transformer in Flowcore

<!-- todo: move this to a another part -->
To use this transformer in the [Flowcore](https://flowcore.io) platform, create a new adapter and point it to the github
release artifact.

The shell will then download the artifact, run it and for each data point post to the `transform` endpoint.

<!-- todo: add a video -->

## Migrate from v1 to v2

The v2 of the transformer shell work differently from v1. The main difference is that the v2 shell loads from a config file rather than through en endpoint. This means that the transformer shell needs to be updated to use the new config file.

### 1. Update the transformer shell docker compose file

change the `transformer` service in the `docker-compose.yaml` file to use the new image.

```yaml
version: "3.8"

services:
   shell:
      container_name: transformer-shell
      image: flowcoreio/adapter-nodejs-transformer-shell:2.1.0
      ports:
         - "3001:3001"
         - "10000:10000"
      environment:
         LOG_LEVEL: debug
         LOG_PRETTY_PRINT: "true"
         TRANSFORMERS: node
         PORT: 3001
         TRANSFORMER_DEV_MODE: "true"
      volumes:
         - ./../../dist:/app/transformers/test-transformer
         - ./../config:/usr/src/app/transformer
```

add a new transformer.json configuration file at `test/config/transformer.json` with the following content:

```json
{
   "name": "test-transformer",
   "version": "1.0.0",
   "runtime": "node",
   "artifactUrl": "/app/transformers/test-transformer",
   "entrypoint": "main.js",
   "startTimeTimeout": 10000,
   "port": 10000
}
```

then finally update the app.spec.ts file to use this new setup.

1. remove the TRANSFORMER_BLUEPRINT const

```typescript
const TRANSFORMER_BLUEPRINT: TransformerBlueprint = JSON.parse(fs.readFileSync(path.join(process.cwd(), "test/config", "transformer.json"), "utf-8"));
```

2. change the check to use the shell health endpoint in `beforeAll`

add adapter port const

```typescript
const adapterPort = 3001;
```

replace the try catch block that loads the transformer with the following code:

```typescript
await waitForExpect(async () => {
console.debug(`Checking if transformer is loaded on http://localhost:${adapterPort}/health`);
const axiosResponse = await axios.get(
        `http://localhost:${adapterPort}/health`,
);

if (axiosResponse.status !== 200) {
   console.debug(`Transformer not loaded on http://localhost:${adapterPort}/health`, axiosResponse.data);
}

expect(axiosResponse.status).toEqual(200);
}, 10000, 1000);
```

3. remove all references to processId

remove the `processId` let variable and the `processId` from the `axios.post` call. This is the simplified version of the `axios.post` call:

```typescript
const processedResult = await axios.post(
        "http://localhost:3001/transform",
        data,
);
```

4. and finally remove the unload transformer call in `afterAll`, it should just look like this:

```typescript
afterAll(async () => {
    server.close();
  });
```
