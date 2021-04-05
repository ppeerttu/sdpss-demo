# todo-backend

A very simple Deno application serving todo items.

## Getting started

1. Install [Deno](https://deno.land/#installation)
2. Install [PostgreSQL](https://www.postgresql.org) or use the [docker-compose.yml](./docker-compose.yml) to launch PostgreSQL instance
2. Run the server with `deno run --allow-net --allow-env main.ts`
   * If you don't use Docker for the database, either configure the Deno app via env variables, or configure your database with the default values (see `config/database.ts`) 

