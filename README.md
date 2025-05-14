# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Local Development without Docker](#local-development-without-docker)
      - [Running the cms application](#running-the-cms-application)
      - [Running the frontend application](#running-the-frontend-application)
    - [Local development with Docker Compose](#local-development-with-docker-compose)
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

3. Set correct environment variables in the cms directory:

   ```bash
   cp ./apps/cms/.env.example ./apps/cms/.env
   ```

   Update the `.env` file with your desired configuration.
4. Set correct environment variables in the frontend directory:

   ```bash
   cp ./apps/frontend/.env.example ./apps/frontend/.env
   ```

5. Update the `.env` file with your desired configuration. You can find the Strapi `STRAPI_API_KEY` in the Strapi admin panel under Settings > API Tokens when running the cms application.

### Local Development without Docker

1. Make sure you have the required tools installed.

   - [Deno](https://deno.land/) (for workspace and Astro)
   - [Node.js](https://nodejs.org/) (for Strapi)
   - [pnpm](https://pnpm.io/) (for Strapi)
   - [Docker](https://www.docker.com/) (for running the database)
   - [Docker Compose](https://docs.docker.com/compose/)

2. Install the workspace dependencies:

   ```bash
   deno install --allow-scripts=npm:sharp@0.33.5
   ```

#### Running the cms application

1. For simplicity use sqlite for development without containers. To do this:  
   a. Uncomment the variables under `Databse configuration for SQLite` in the `apps/cms/.env` file  
   b. Commnet out the variables under `Database configuration for Postgres`.

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

### Local development with Docker Compose

1. Build the cms app locally due to some compatibility issues with the latest version of Strapi and the Docker image:

   ```bash
   deno task cms:build
   ```

1. Start the `cms` and `cms-db` services first to create and store an api key in the database which will be used later by the frontend application:

   ```bash
   docker-compose up --build cms cms-db
   ```

2. Go to the Strapi admin panel at `http://localhost:1337/admin` and create an API key under Settings > API Tokens. Copy the API key. and paste it in the `.env` file of the frontend application in the `STRAPI_API_KEY` variable.

3. Start the frontend service in a new terminal:

   ```bash
   docker-compose up --build frontend
   ```

   (Optional) Alternatively, you can run all three services together by running the following command in a new terminal:

   ```bash
   docker-compose up --watch --build
   ```

   This will start all three services, but rebuild the frontend service automatically when the `./apps/frontend/.env` file changes after you add the `STRAPI_API_KEY` variable (step 2).

4. Open your browser and go to `http://localhost:1337` for the cms and `http://0.0.0.0:8085` for the frontend to see the applications running.

## 🤝 Contributing

Learn how you can contribute to this project by reading our Code of Conduct and Contributing Guide.

[Contributing](/contributing.md)