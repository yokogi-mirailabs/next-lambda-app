FROM node:22-bookworm

# Install basic tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Enable corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /workspace

# Keep container running
CMD ["sleep", "infinity"]