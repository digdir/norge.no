# Use the official Deno image
FROM denoland/deno:2.7.7

RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the Deno configuration file to the root of the workspace
COPY deno.json deno.lock ./

# Copy application code
COPY apps/frontend ./apps/frontend
COPY packages/ui ./packages/ui
COPY packages/types ./packages/types
COPY packages/data-access ./packages/data-access
COPY packages/analytics ./packages/analytics

# Install dependencies
RUN deno task frontend:build

# Expose the port Astro runs on
EXPOSE 4321

# Start the Astro application
CMD ["deno", "task", "frontend:preview"]