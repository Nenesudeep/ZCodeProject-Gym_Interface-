# Anchor Strength

Marketing website, NestJS backend, and Strapi CMS for **Anchor Strength** — Boduppal's 1st Calisthenics Gym (Boduppal, Hyderabad).

Built to out-class the reference site (`starfitnessstudio.in`) with server-side rendering for SEO, an editable headless CMS content layer, and a real lead-capture backend.

## Tech stack

| Layer | Tech |
| --- | --- |
| Monorepo | pnpm workspaces + Turborepo |
| Web | Nuxt 3 (Vue 3 + TS), Tailwind CSS, Nuxt UI |
| API | NestJS (TS), Prisma, PostgreSQL |
| CMS | Strapi v5 (headless) |
| Infra | Docker, Cloudflare, GitHub Actions |

## Structure

```
apps/
  web/   # Nuxt 3 marketing site (SSR)
  api/   # NestJS backend (leads, contact, newsletter)
  cms/   # Strapi headless CMS
packages/
  config/  # shared tsconfig + eslint
```

## Quick start

Requirements: Node 20.x, pnpm (`corepack enable`), Docker. Strapi currently
supports Node 20 but not newer major Node versions.

```bash
# 1. Install dependencies
pnpm install

# 2. Start local Postgres + Redis + mail catcher
docker compose up -d

# 3. Copy env files and configure
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 4. Run database migrations + seed
pnpm db:migrate
pnpm db:seed

# 5. Run all apps in dev (web :3000, api :4000, cms :1337)
pnpm dev
```

| Service | URL | Notes |
| --- | --- | --- |
| Web | http://localhost:3000 | Nuxt marketing site |
| API | http://localhost:4000 | NestJS, Swagger at `/api/docs` |
| CMS | http://localhost:1337/admin | Strapi admin |
| Mail catcher | http://localhost:8025 | Mailpit (dev email) |

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run all apps in parallel |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint everything |
| `pnpm typecheck` | TypeScript check |
| `pnpm db:migrate` | Apply Prisma migrations |
| `pnpm db:seed` | Seed database |
| `pnpm db:studio` | Prisma Studio GUI |

## Roadmap

- **v1 (now):** Marketing site, lead capture backend, editable CMS content.
- **v2:** Member portal (auth), class timetable + booking, Razorpay payments, trainer detail pages.

## License

Proprietary — Anchor Strength. All rights reserved.
