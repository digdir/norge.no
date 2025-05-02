# Use the official Deno image
FROM denoland/deno:alpine-2.2.11

ARG STRAPI_API_URL=http://localhost:1337
ENV STRAPI_API_URL=${STRAPI_API_URL}

# Set the working directory
WORKDIR /app

# Copy the Deno configuration file to the root of the workspace
COPY deno.json deno.lock ./

# Copy application code
COPY apps/frontend ./apps/frontend
COPY packages/ui ./packages/ui
COPY packages/types ./packages/types

# Install dependencies
RUN deno task frontend:build

# Expose the port Astro runs on
EXPOSE 4321

# Start the Astro application
CMD ["deno", "task", "frontend:preview", "--host"]