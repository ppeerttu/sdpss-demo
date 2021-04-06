# sdpss-demo

Demo app for deployment demonstration purposes.

## Components

* [todo-backend](./todo-backend) - a simple Deno backend with PostgreSQL database
* [todo-frontend](./todo-frontend) - a simple Next.js app serving a frontend

The applications has been created for demonstration purposes only, and thus is nowhere close to production ready.

## Running the app

You'll need Docker, Deno and Node.js installed. If you're not doing development, you'll need only Docker.

### Backend (dev)

For running the backend for development purposes, see the REAMDE in [todo-backend](./todo-backend).

### Fontend (dev)

For running the frontend for development purposes, see the README in [todo-frontend](./todo-frontend).

### Deployment

For deploying the app, we provide instructions with Docker. Follow these steps:

1. Build the backend image: `cd todo-backend && docker build -t todo-backend:latest .`
2. Build the frontend image: `cd todo-frontend && docker build -t todo-frontend:latest .`
   * You might need to change the `API_URL` build argument for the frontend if you're deploying the containers to real remote environment
3. Launch the container images with `docker run ...`
   * Make sure you have the database running somewhere for the backend, as well as configured properly. You can configure the database in the backend container via `POSTGRES_...` environmnet variables.

You'll probably need to have a proxy server in front of these containers such as Nginx with TLS termination set up when running in production.

