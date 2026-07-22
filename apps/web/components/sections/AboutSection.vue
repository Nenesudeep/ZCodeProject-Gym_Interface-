<script setup lang="ts">
import { useContent } from '~/app/composables/useContent'
import { brand } from '~/app/theme.config'

const { trainers } = useContent()
const coaches = trainers()

const pillars = [
  {
    icon: 'lucide:target',
    title: 'Goal-first coaching',
    text: 'Every program is built around what you want to achieve — not a one-size-fits-all template.',
  },
  {
    icon: 'lucide:users',
    title: 'A team, not a gym',
    text: 'You join a community that trains together, competes together and celebrates together.',
  },
  {
    icon: 'lucide:dumbbell',
    title: '12 disciplines',
    text: 'Calisthenics to MMA to yoga — the broadest training variety in east Hyderabad.',
  },
  {
    icon: 'lucide:clock',
    title: 'Open 365 days',
    text: 'From 5 AM to 10 PM most days (9 PM Sundays). Train when life lets you.',
  },
]
</script>

<template>
  <SectionShell id="about" tone="muted" eyebrow="Who we are" title="More than a gym. A team.">
    <template #subtitle>
      {{ brand.tagline }}. We exist to make serious, varied strength training accessible to
      everyone in Boduppal — beginners and athletes alike.
    </template>

    <!-- Pillars -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="p in pillars" :key="p.title" class="card-surface p-6">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-400/15 text-accent-400"
        >
          <Icon :name="p.icon" class="h-5 w-5" />
        </div>
        <h3 class="mt-4 font-display text-lg">{{ p.title }}</h3>
        <p class="mt-2 text-sm text-zinc-400">{{ p.text }}</p>
      </div>
    </div>

    <!-- Coaches -->
    <div class="mt-16">
      <h3 class="text-center font-display text-2xl">Meet the coaches</h3>
      <p class="mt-2 text-center text-sm text-zinc-400">
        Placeholder profiles — real bios and photos drop in via the CMS.
      </p>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(coach, i) in coaches" :key="i" class="card-surface flex gap-4 p-6">
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 font-display text-2xl text-white"
          >
            <Icon name="lucide:user" class="h-7 w-7" />
          </div>
          <div>
            <h4 class="font-semibold text-white">{{ coach.name }}</h4>
            <p class="text-sm text-accent-300">{{ coach.specialty }}</p>
            <p class="mt-1 text-sm text-zinc-400">{{ coach.bio }}</p>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span
                v-for="cert in coach.certifications"
                :key="cert"
                class="rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
              >
                {{ cert }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
