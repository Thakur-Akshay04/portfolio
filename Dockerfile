# Stage 1: Install dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install package manager
RUN npm install -g pnpm

# Copy package files (explicitly defined, no globs to comply with S6470)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the source code
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Safe copy: all sensitive credentials (.env.local, .git, etc.) are ignored via .dockerignore (S6470)
COPY . .

# Set environment variables for build time
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Install package manager for pnpm build
RUN npm install -g pnpm
RUN pnpm build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build outputs as root with read-only permissions (555) for security
COPY --from=builder --chown=root:root --chmod=555 /app/public ./public
COPY --from=builder --chown=root:root --chmod=555 /app/.next/standalone ./
COPY --from=builder --chown=root:root --chmod=555 /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
