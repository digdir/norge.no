# norge.no

Backlog for norge.no

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
### Local Development
Make sure you have the required tools installed. 
- [Deno](https://deno.land/) (for workspace and Astro)
- [Node.js](https://nodejs.org/) (for Strapi)
- [pnpm](https://pnpm.io/) (for Strapi)


Install the workspace dependencies:
   ```bash
   deno install
   ```

#### Running the cms application
1. Set correct environment variables in the cms directory:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your desired configuration.
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
1. Set correct environment variables in the frontend directory:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your desired configuration. You can find the Strapi `STRAPI_API_KEY` in the Strapi admin panel under Settings > API Tokens.
1. Open a new terminal at the project directory
2. Start the cms development server:
   ```bash
   deno task frontend:dev
   ```
3. Open your browser and go to `http://localhost:4321` to see the application running.
   
## 🤝 Contributing

Learn how you can contribute to this project by reading our Code of Conduct and Contributing Guide.

[Contributing](/contributing.md)