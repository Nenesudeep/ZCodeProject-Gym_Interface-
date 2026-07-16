# ── Build stage ──────────────────────────────────────────────
FROM node:20-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace root manifests for install.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages/config ./packages/config
COPY apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile

# Copy API source + generate Prisma client.
COPY apps/api ./apps/api
RUN pnpm --filter @anchor/api exec prisma generate
RUN pnpm --filter @anchor/api run build

# ── Production stage ─────────────────────────────────────────
FROM node:20-slim AS runner

ENV NODE_ENV=production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

EXPOSE 4000

CMD ["node", "apps/api/dist/main.js"]
