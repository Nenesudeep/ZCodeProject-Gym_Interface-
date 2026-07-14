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
    resendApiKey: env.RESEND_API_KEY,
    emailFrom: env.EMAIL_FROM,
    emailTo: env.EMAIL_TO,
    whatsappPhone: env.WHATSAPP_PHONE,
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
