# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Local Development without Docker](#local-development-without-docker)
      - [Running the cms application](#running-the-cms-application)
      - [Running the frontend application](#running-the-frontend-application)
    - [Local development with Docker](#local-development-with-docker)
      - [Running the cms application in isolation with Docker](#running-the-cms-application-in-isolation-with-docker)
      - [Running the frontend application in isolation with Docker](#running-the-frontend-application-in-isolation-with-docker)
      - [Running the cms and frontend applications together with Docker Compose](#running-the-cms-and-frontend-applications-together-with-docker-compose)
  - [🤝 Contributing](#-contributing)

## Getting Started

### Prerequisites

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:digdir/norge.no.git
   ```

2. Navigate to the project directory:

   ```bash
   cd norge.no
   ```

### Local Development without Docker

1. Make sure you have the required tools installed.

   - [Deno](https://deno.land/) (for workspace and Astro)
   - [Node.js](https://nodejs.org/) (for Strapi)
   - [pnpm](https://pnpm.io/) (for Strapi)

2. Install the workspace dependencies:

   ```bash
   deno install --allow-scripts=npm:sharp@0.33.5
   ```

3. Set correct environment variables in the cms directory:

   ```bash
   cp ./apps/cms/.env.example ./apps/cms/.env
   ```

   Update the `.env` file with your desired configuration.
4. Set correct environment variables in the frontend directory:

   ```bash
   cp ./apps/frontend/.env.example ./apps/frontend/.env
   ```

   Update the `.env` file with your desired configuration. You can find the Strapi `STRAPI_API_KEY` in the Strapi admin panel under Settings > API Tokens when running the cms application.


#### Running the cms application

1. Fire up a postgres database:

   ```bash
   docker run \
      -p 5432:5432 \
      --name cms-db \
      -e POSTGRES_USER=cms-user \
      -e POSTGRES_PASSWORD=cms-password \
      -e POSTGRES_DB=cms-db \
      -d postgres
   ```

2. Install the cms dependencies:

   ```bash
   deno task cms:install
   ```

3. Start the cms development server:

   ```bash
   deno task cms:dev
   ```

4. Open your browser and go to `http://localhost:1337` to see the application running.

#### Running the frontend application

1. Open a new terminal at the project directory
2. Start the cms development server:

   ```bash
   deno task frontend:dev
   ```

3. Open your browser and go to `http://localhost:4321` to see the application running.

### Local development with Docker

1. Make sure you have Docker installed by running the following command:

   ```bash
   docker --version
   ```

2. Make sure you have [Docker Compose](https://docs.docker.com/compose/) installed by running the following command:

```bash
docker-compose --version
```

3. You might be asked to log in to Docker Hub from terminal. You can do this by running the following command:

   ```bash
   docker login \
      -u <your-username> \
      -p <access token or password>
   ```

#### Running the cms application in isolation with Docker

1. Produce the `dist` and `.strapi` folder on your local machine by running the following command:

   ```bash
   deno task cms:install
   deno task cms:build
   ```

2. Build the Docker image:

   ```bash
   docker build \
      -t norgeno-cms-image \
      -f ./apps/cms/Dockerfile \
      ./apps/cms/
   ```

3. Start the Docker container:

   ```bash
   docker run \
      -p 1337:1337 \
      --name norgeno-cms-container \
      --env-file ./apps/cms/.env \
      norgeno-cms-image
   ```

4. Open your browser and go to `http://localhost:1337` to see the application running.

#### Running the frontend application in isolation with Docker


1. Build the Docker image:

   ```bash
      docker build \
      -t norgeno-frontend-image \
      -f ./apps/frontend/Dockerfile \
      .
   ```

2. Start the Docker container:

   ```bash
   docker run \
      -p 4321:4321 \
      --name norgeno-frontend-container \
      --env-file ./apps/frontend/.env \
      norgeno-frontend-image
   ```

3. Open your browser and go to `http://localhost:4321` to see the application running.

#### Running the cms and frontend applications together with Docker Compose

1. Start the Docker containers:

   ```bash
   docker-compose up --build
   ```

2. Open your browser and go to `http://localhost:1337` for the cms and `http://localhost:4321` for the frontend to see the applications running.


## 🤝 Contributing

Learn how you can contribute to this project by reading our Code of Conduct and Contributing Guide.

[Contributing](/contributing.md)