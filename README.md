# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Local Development without Docker](#local-development-without-docker)
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

3. Set correct environment variables in the frontend directory:

   ```bash
   cp ./apps/frontend/.env.example ./apps/frontend/.env
   ```

### Local Development without Docker

1. Make sure you have the required tools installed.

   - [Deno](https://deno.land/) (for workspace and Astro)
   - [Docker](https://www.docker.com/) (for running the database)
   - [Docker Compose](https://docs.docker.com/compose/)

2. Install the workspace dependencies:

   ```bash
   deno install --allow-scripts=npm:sharp@0.33.5
   ```

#### Running the frontend application

1. Open a new terminal at the project directory

2. Open your browser and go to `http://localhost:4321` to see the application running.

### Local development with Docker Compose

1. Start the frontend service in a new terminal:

   ```bash
   docker-compose up --build frontend
   ```

   (Optional) Alternatively, you can run all three services together by running the following command in a new terminal:

   ```bash
   docker-compose up --watch --build
   ```

   This will start all three services, but rebuild the frontend service automatically when the `./apps/frontend/.env` file changes.

2. Open your browser and go to `http://0.0.0.0:8085` for the frontend to see the applications running.

## 🤝 Contributing

Learn how you can contribute to this project by reading our Code of Conduct and Contributing Guide.

[Contributing](/contributing.md)