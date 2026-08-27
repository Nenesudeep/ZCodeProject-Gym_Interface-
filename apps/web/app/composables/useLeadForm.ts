import { ref } from 'vue'
import { z } from 'zod'

/**
 * Shared lead-form logic: validation (zod), submission to the NestJS API,
 * and status handling. Reused by the free-trial and contact forms.
 *
 * The honeypot field `website` is hidden from humans; any value = bot.
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export const leadSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .regex(/^[+\d][\d\s-]{7,19}$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  goal: z.string().optional(),
  program: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(), // honeypot
})

export type LeadPayload = z.infer<typeof leadSchema>

export function useLeadForm(endpoint: '/api/leads' | '/api/contact' = '/api/leads') {
  const status = ref<FormStatus>('idle')
  const errorMessage = ref('')
  const errors = ref<Record<string, string>>({})

  const { public: pub } = useRuntimeConfig()

  async function submit(payload: LeadPayload): Promise<boolean> {
    status.value = 'submitting'
    errorMessage.value = ''
    errors.value = {}

    // Client-side validation.
    const parsed = leadSchema.safeParse(payload)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]?.toString()
        if (field) errors.value[field] = issue.message
      })
      status.value = 'error'
      errorMessage.value = 'Please check the highlighted fields.'
      return false
    }

    // Honeypot: pretend success without sending.
    if (parsed.data.website) {
      status.value = 'success'
      return true
    }

    // Omit empty optional strings — Nest `@IsOptional()` only skips null/undefined,
    // so `email: ""` fails `@IsEmail()` and `goal: ""` fails `@IsEnum()`.
    const body = Object.fromEntries(
      Object.entries(parsed.data).filter(([, value]) => value !== '' && value != null),
    )

    try {
      const base = String(pub.apiBaseUrl ?? '').replace(/\/+$/, '')
      await $fetch(`${base}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      status.value = 'success'
      return true
    } catch (err: unknown) {
      status.value = 'error'
      const data = err as { data?: { message?: string | string[] } }
      const msg = data?.data?.message
      errorMessage.value = Array.isArray(msg)
        ? msg.join('. ')
        : (msg ?? 'Something went wrong. Please try again or call us directly.')
      return false
    }
  }

  function reset() {
    status.value = 'idle'
    errorMessage.value = ''
    errors.value = {}
  }

  return { status, errorMessage, errors, submit, reset }
}
