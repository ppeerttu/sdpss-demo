# todo-backend

A very simple Deno application serving todo items.

## Getting started

1. Install [Deno](https://deno.land/#installation)
2. Install [PostgreSQL](https://www.postgresql.org) or use the [docker-compose.yml](./docker-compose.yml) to launch PostgreSQL instance
3. Install [Redis](https://redis.io) or use the docker-compose file to launch an instance
4. Run the server with `deno run --allow-net --allow-env main.ts`
   * You can watch for file changes with `deno run --allow-net --allow-env --watch --unstable main.ts`
   * If you don't use Docker for the database, either configure the Deno app via env variables, or configure your database with the default values (see `config/database.ts`) 

## Deploying

This repository contains a simple [Dockerfile](Dockerfile) that shows how to run the app as an deployment. It's naive implementation, and probably not completely production ready. You can build the image with:

```bash
docker build -t todo-backend .
```

And run it:

```bash
docker run --port 8080:8080 todo-backend
```

You can configure environment variables with `--env` flag, e.g. `--env PORT=4000`.
