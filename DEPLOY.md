# Production deploy (Vercel + Render + Neon)

**Live now:** [marketing site](https://anchor-strength-web.onrender.com) and [API](https://anchor-strength-api.onrender.com) ([health](https://anchor-strength-api.onrender.com/health)) on Render free tier — see [README.md](./README.md#live--demo).

Marketing site on **Vercel**, NestJS API on **Render** (Docker), Postgres on **Neon**. No member accounts, no Strapi CMS, no Redis.

Prisma migrations already run in the API Docker `CMD` (`prisma migrate deploy` then the Nest server). Do not add a second migrate step on Render.

## 1. Neon (Postgres)

1. Create a free project at [neon.tech](https://neon.tech).
2. Copy the **direct** connection string (the host **without** `-pooler`). Render is a long-running Node process; the pooler URL can break `prisma migrate deploy`.
3. Append `sslmode=require` if it is not already present:

```text
postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
```

URL-encode special characters in the password.

## 2. Render (API only)

Connect [this GitHub repo](https://github.com/Nenesudeep/ZCodeProject-Gym_Interface-) and apply the root `render.yaml` Blueprint, **or** create a Web Service manually:

| Setting | Value |
| --- | --- |
| Runtime | Docker |
| Dockerfile path | `apps/api/Dockerfile` |
| Build context | repo root (`.`) |
| Instance | Free |
| Health check | `GET /health` |

Do **not** deploy `apps/cms`, Redis, or `docker-compose.prod.yml`.

### API env vars

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes | Neon URI with `sslmode=require` (direct host, not pooler) |
| `CORS_ORIGINS` | yes | Comma-separated origins. **Must include the Vercel URL** and any custom domain, e.g. `https://anchorstrength.fit,https://your-app.vercel.app`. Optional wildcard: `https://*.vercel.app` |
| `NODE_ENV` | set by Blueprint | `production` |
| `PORT` | no | Render injects this; the server already binds `0.0.0.0:$PORT` |
| `RESEND_API_KEY` | no | Lead/contact/newsletter still save without email |
| `EMAIL_FROM` | no | Default: `Anchor Strength <hello@anchorstrength.fit>` |
| `EMAIL_TO` | no | Default: `anchorstrengthofficial@gmail.com` (comma-separated OK) |
| `WHATSAPP_PHONE` | no | Default: `919379066066` |

After the first deploy, copy the public URL (e.g. `https://anchor-strength-api.onrender.com`). That origin is `PUBLIC_API_BASE_URL` on Vercel. There is **no** `/api` suffix on the origin; the Nest global prefix is already `/api`.

Endpoints:

- `GET /health` — liveness (no `/api` prefix)
- `POST /api/leads`
- `POST /api/contact`
- `POST /api/newsletter/subscribe`

Free Render instances spin down after idle; the first request after that is slow.

## 3. Vercel (Nuxt SSR)

Import the same GitHub repo. **Root Directory must be `apps/web`** so Nitro writes `.vercel/output` where Vercel expects it.

| Setting | Value |
| --- | --- |
| Root Directory | `apps/web` |
| Framework | Nuxt.js (from `apps/web/vercel.json`) |
| Node.js | **20** (`packageManager` is `pnpm@10.34.5` — pnpm 11 needs Node 22 and would fail here) |
| Install | `cd ../.. && pnpm install --frozen-lockfile --filter @anchor/web...` |
| Build | `pnpm build` (`nuxt build`) |
| Output directory | leave **empty** — do not set `.output` or `dist` (that would drop SSR) |

Nitro selects the `vercel` preset automatically when `VERCEL=1`. `nuxt.config.ts` also pins `preset: 'vercel'` in that case so the Build Output API is used. Do not set `NITRO_PRESET=vercel` for Docker/local builds.

Include files outside the Root Directory (Vercel default since 2020) so pnpm workspaces resolve.

### Web env vars

Set for Production **and** Preview. Origins only — no trailing slash, no `/api` path.

| Variable | Required | Notes |
| --- | --- | --- |
| `PUBLIC_API_BASE_URL` | yes | Render origin, e.g. `https://anchor-strength-api.onrender.com`. Forms POST here from the browser |
| `NUXT_PUBLIC_API_BASE_URL` | recommended | Same value. Nuxt runtime override for `runtimeConfig.public.apiBaseUrl` |
| `API_BASE_URL` | recommended | Same Render origin (server-side) |
| `SITE_URL` | yes | Canonical site, e.g. `https://anchorstrength.fit` or `https://your-app.vercel.app` |
| `PLAUSIBLE_DOMAIN` | no | Leave empty to disable analytics |

Redeploy the web app after the API URL is known.

## 4. CORS (required for forms)

Browser forms POST to `PUBLIC_API_BASE_URL` (`/api/leads`, `/api/contact`, `/api/newsletter/subscribe`). Render must allow the Vercel origin:

```text
CORS_ORIGINS=https://anchorstrength.fit,https://your-app.vercel.app
```

Preview deployments use unique `*.vercel.app` hosts. Add `https://*.vercel.app` if those should submit forms too.

Then redeploy the API (or restart) so the new env is picked up.

## 5. Order of operations

1. Neon database + `DATABASE_URL`
2. Render API with `DATABASE_URL` and a placeholder `CORS_ORIGINS` (e.g. `https://anchorstrength.fit`)
3. Vercel web with `PUBLIC_API_BASE_URL` = Render URL
4. Update Render `CORS_ORIGINS` to the real Vercel URL (and custom domain)
5. Optional: point `SITE_URL` / DNS at Vercel; add that domain to `CORS_ORIGINS`

## Out of scope

- Strapi (`apps/cms`) — do not host
- Redis — Throttler is in-memory
- Member auth, payments, booking
- Committing `.env` files or secrets
