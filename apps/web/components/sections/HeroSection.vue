<script setup lang="ts">
import { brand, whatsappLink } from '~/app/theme.config'

const waMessage = `Hi ${brand.name}! I'd like to book a free trial session.`

// Headline stats for instant credibility.
const stats = [
  { value: '12', label: 'Disciplines' },
  { value: '365', label: 'Days open' },
  { value: '5AM', label: 'Early opening' },
  { value: '5.0★', label: `${brand.rating.count} reviews` },
]
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Background: gradient + grain via layered divs -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-b from-brand-950 via-ink-950 to-ink-950" />
      <div
        class="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-3xl"
      />
      <div
        class="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-3xl"
      />
    </div>

    <AppContainer class="py-20 sm:py-28 lg:py-32">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Copy -->
        <div class="animate-fade-up">
          <p class="eyebrow mb-5">
            <span class="h-px w-6 bg-accent-400" />
            {{ brand.tagline }}
          </p>
          <h1 class="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Build <span class="text-gradient">unstoppable</span> strength.
          </h1>
          <p class="mt-6 max-w-xl text-lg text-zinc-300 sm:text-xl">
            {{ brand.subTagline }} Calisthenics, MMA, kettlebell group training, yoga and more —
            east Hyderabad's most complete strength &amp; functional training gym.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton :href="whatsappLink(brand.contact.whatsapp, waMessage)" size="lg">
              <Icon name="lucide:message-circle" class="h-5 w-5" />
              Book a free trial
            </AppButton>
            <AppButton to="/#programs" variant="outline" size="lg">
              Explore programs
              <Icon name="lucide:arrow-down" class="h-4 w-4" />
            </AppButton>
          </div>

          <!-- Stats -->
          <dl class="mt-12 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            <div v-for="s in stats" :key="s.label">
              <dt class="font-display text-3xl text-accent-400">{{ s.value }}</dt>
              <dd class="text-xs text-zinc-400">{{ s.label }}</dd>
            </div>
          </dl>
        </div>

        <!-- Visual: placeholder hero card -->
        <div class="relative animate-fade-in lg:justify-self-end">
          <div
            class="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-800 via-ink-800 to-accent-900/40 shadow-2xl"
          >
            <!-- Decorative grid + anchor -->
            <div
              class="absolute inset-0 opacity-20"
              style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 32px 32px;"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <span class="text-8xl">⚓</span>
              <p class="mt-4 font-display text-2xl tracking-wide">YOUR PHOTO HERE</p>
              <p class="mt-2 text-sm text-zinc-400">
                Drop in a gym interior or action shot via the CMS to replace this placeholder.
              </p>
            </div>
          </div>
          <!-- Floating badge -->
          <div
            class="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-ink-800/90 px-5 py-3 backdrop-blur sm:block"
          >
            <p class="font-display text-lg text-accent-400">{{ brand.rating.score }} ★</p>
            <p class="text-xs text-zinc-400">on {{ brand.rating.source }}</p>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
