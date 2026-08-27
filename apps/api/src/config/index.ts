import { z } from 'zod'

/**
 * Centralised, validated runtime configuration.
 * Loaded once at bootstrap; `getConfig()` returns the cached instance.
 */
const ConfigSchema = z.object({
  nodeEnv: z.enum(['development', 'test', 'production']).default('development'),
  port: z.coerce.number().int().positive().default(4000),
  corsOrigins: z
    .string()
    .default('http://localhost:3000')
    .transform((s) => s.split(',').map((o) => o.trim()).filter(Boolean)),
  databaseUrl: z.string().url(),
  resendApiKey: z.string().optional(),
  emailFrom: z.string().default('Anchor Strength <hello@anchorstrength.fit>'),
  emailTo: z
    .string()
    .default('anchorstrengthofficial@gmail.com')
    .transform((s) => s.split(',').map((e) => e.trim()).filter(Boolean)),
  whatsappPhone: z.string().default('919379066066'),
  enableSwaggerInProd: z
    .preprocess((v) => v === 'true' || v === '1', z.boolean())
    .default(false),
})

export type Config = z.infer<typeof ConfigSchema>

let cached: Config | null = null

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const parsed = ConfigSchema.safeParse({
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    corsOrigins: env.CORS_ORIGINS,
    databaseUrl: env.DATABASE_URL,
    resendApiKey: env.RESEND_API_KEY || undefined,
    emailFrom: env.EMAIL_FROM || undefined,
    emailTo: env.EMAIL_TO || undefined,
    whatsappPhone: env.WHATSAPP_PHONE || undefined,
    enableSwaggerInProd: env.ENABLE_SWAGGER_IN_PROD,
  })

  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error('❌ Invalid environment configuration:\n', parsed.error.format())
    throw new Error('Invalid environment configuration')
  }

  cached = parsed.data
  return cached
}

export function getConfig(): Config {
  if (!cached) return loadConfig()
  return cached
}

/**
 * Match a browser Origin against CORS_ORIGINS.
 * Supports exact URLs (trailing slash ignored) and a single `*` wildcard
 * per entry, e.g. `https://*.vercel.app`.
 */
export function isCorsOriginAllowed(
  origin: string | undefined,
  allowed: string[],
): boolean {
  if (!origin) return true
  const incoming = origin.replace(/\/+$/, '')
  return allowed.some((rule) => {
    const normalized = rule.replace(/\/+$/, '')
    if (!normalized) return false
    if (normalized === incoming) return true
    if (!normalized.includes('*')) return false
    const pattern = normalized
      .replace(/\*/g, '\0')
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\0/g, '[^.]+')
    return new RegExp(`^${pattern}$`, 'i').test(incoming)
  })
}
