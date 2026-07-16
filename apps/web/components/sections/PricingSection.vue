<script setup lang="ts">
import { useContent } from '~/app/composables/useContent'
import { brand, whatsappLink } from '~/app/theme.config'

const { pricing } = useContent()
const plans = pricing()

const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

const waMessage = (planName: string) =>
  `Hi ${brand.name}! I'm interested in the ${planName} membership. Can you share details?`
</script>

<template>
  <SectionShell id="pricing" tone="default" eyebrow="Membership" title="Simple, honest pricing.">
    <template #subtitle>
      No hidden fees, no lock-in surprises. Start monthly or commit and save. Promotional offers
      are subject to availability.
    </template>

    <div class="grid gap-6 lg:grid-cols-3">
      <div
        v-for="plan in plans"
        :key="plan.slug"
        class="relative card-surface flex flex-col p-7"
        :class="plan.isFlagship ? 'border-accent-400/50 ring-1 ring-accent-400/30' : ''"
      >
        <!-- Badges -->
        <div class="absolute -top-3 left-7 flex gap-2">
          <span
            v-if="plan.priceNote"
            class="rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold text-ink-950"
          >
            {{ plan.priceNote }}
          </span>
          <span
            v-if="plan.isPromo"
            class="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white"
          >
            Limited
          </span>
        </div>

        <h3 class="font-display text-2xl">{{ plan.name }}</h3>
        <p class="mt-2 text-sm text-zinc-400">{{ plan.description }}</p>

        <div class="mt-5 flex items-baseline gap-1">
          <span class="font-display text-4xl">{{ formatINR(plan.price) }}</span>
          <span class="text-sm text-zinc-500">/ {{ plan.period }}</span>
        </div>

        <ul class="mt-6 flex-1 space-y-3">
          <li
            v-for="(f, i) in plan.features"
            :key="i"
            class="flex items-start gap-2.5 text-sm"
            :class="f.included ? 'text-zinc-200' : 'text-zinc-600 line-through'"
          >
            <Icon
              :name="f.included ? 'lucide:check-circle-2' : 'lucide:x-circle'"
              class="mt-0.5 h-4 w-4 shrink-0"
              :class="f.included ? 'text-accent-400' : 'text-zinc-600'"
            />
            {{ f.text }}
          </li>
        </ul>

        <AppButton
          :href="whatsappLink(brand.contact.whatsapp, waMessage(plan.name))"
          :variant="plan.isFlagship ? 'primary' : 'outline'"
          block
          class="mt-7"
        >
          {{ plan.ctaLabel }}
        </AppButton>
      </div>
    </div>

    <p class="mt-6 text-center text-xs text-zinc-500">
      Prices are indicative and may change. Confirm current rates with us before enrolling.
    </p>
  </SectionShell>
</template>
