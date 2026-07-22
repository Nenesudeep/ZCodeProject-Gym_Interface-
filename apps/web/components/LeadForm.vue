<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useLeadForm } from '~/app/composables/useLeadForm'

const props = defineProps<{
  /** Which API endpoint to post to. */
  endpoint?: '/api/leads' | '/api/contact'
  /** Default program interest (passed from program detail pages). */
  defaultProgram?: string
  /** Show the message field prominently. */
  variant?: 'trial' | 'contact'
}>()

const { submit, status, errorMessage, errors } = useLeadForm(props.endpoint)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  goal: '',
  program: props.defaultProgram ?? '',
  message: '',
  website: '', // honeypot — must stay empty
})

const goals = [
  { value: '', label: 'Select your goal' },
  { value: 'calisthenics', label: 'Calisthenics' },
  { value: 'weight-loss', label: 'Weight loss' },
  { value: 'strength', label: 'Strength' },
  { value: 'mma', label: 'MMA / Combat' },
  { value: 'group-training', label: 'Group training' },
  { value: 'general', label: 'General fitness' },
]

const showSuccess = ref(false)
const successName = ref('')

async function handleSubmit() {
  const submittedName = form.name.trim()
  const ok = await submit({ ...form })
  if (ok) {
    successName.value = submittedName
    showSuccess.value = true
    // Reset fields (keep program).
    form.name = ''
    form.phone = ''
    form.email = ''
    form.goal = ''
    form.message = ''
  }
}
</script>

<template>
  <div class="card-surface p-6 sm:p-8">
    <!-- Success state -->
    <div v-if="showSuccess" class="flex flex-col items-center py-8 text-center">
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-accent-400/20 text-accent-400"
      >
        <Icon name="lucide:check" class="h-8 w-8" />
      </div>
      <h3 class="mt-4 font-display text-2xl">You're all set!</h3>
      <p class="mt-2 text-zinc-400">
        Thanks{{ successName ? `, ${successName.split(' ')[0]}` : '' }} — our team will reach out
        within a few hours to confirm your session.
      </p>
      <AppButton
        variant="ghost"
        size="sm"
        class="mt-6"
        @click="showSuccess = false; successName = ''"
      >
        Submit another
      </AppButton>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" novalidate>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <label class="mb-1.5 block text-sm font-medium text-zinc-300" for="lf-name">
            Name <span class="text-accent-400">*</span>
          </label>
          <input
            id="lf-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            class="w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            :class="errors.name ? 'border-red-500' : ''"
            placeholder="Your name"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-400">{{ errors.name }}</p>
        </div>

        <div class="sm:col-span-1">
          <label class="mb-1.5 block text-sm font-medium text-zinc-300" for="lf-phone">
            Phone <span class="text-accent-400">*</span>
          </label>
          <input
            id="lf-phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            class="w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            :class="errors.phone ? 'border-red-500' : ''"
            placeholder="+91 9XXXXXXXXX"
          />
          <p v-if="errors.phone" class="mt-1 text-xs text-red-400">{{ errors.phone }}</p>
        </div>

        <div class="sm:col-span-1">
          <label class="mb-1.5 block text-sm font-medium text-zinc-300" for="lf-email">
            Email
          </label>
          <input
            id="lf-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            :class="errors.email ? 'border-red-500' : ''"
            placeholder="you@example.com"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-red-400">{{ errors.email }}</p>
        </div>

        <div v-if="variant !== 'contact'" class="sm:col-span-1">
          <label class="mb-1.5 block text-sm font-medium text-zinc-300" for="lf-goal">
            Your goal
          </label>
          <select
            id="lf-goal"
            v-model="form.goal"
            class="w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-white focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          >
            <option v-for="g in goals" :key="g.value" :value="g.value">{{ g.label }}</option>
          </select>
        </div>
      </div>

      <div class="mt-4">
        <label class="mb-1.5 block text-sm font-medium text-zinc-300" for="lf-message">
          {{ variant === 'contact' ? 'Message' : 'Anything you want us to know?' }}
        </label>
        <textarea
          id="lf-message"
          v-model="form.message"
          rows="3"
          class="w-full resize-y rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          placeholder="I want to start calisthenics training..."
        />
      </div>

      <!-- Honeypot: hidden from real users. -->
      <div class="hidden" aria-hidden="true">
        <label for="lf-website">Website</label>
        <input id="lf-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <AppButton type="submit" size="lg" :disabled="status === 'submitting'">
          <Icon
            v-if="status === 'submitting'"
            name="lucide:loader-circle"
            class="h-4 w-4 animate-spin"
          />
          <Icon v-else name="lucide:send" class="h-4 w-4" />
          {{ status === 'submitting' ? 'Sending…' : 'Book my free trial' }}
        </AppButton>
        <p class="text-xs text-zinc-500">
          We'll call you back the same day. No spam, ever.
        </p>
      </div>

      <p v-if="errorMessage" class="mt-3 text-sm text-red-400">{{ errorMessage }}</p>
    </form>
  </div>
</template>
