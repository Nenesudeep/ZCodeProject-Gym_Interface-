<script setup lang="ts">
import { computed } from 'vue'
import { useContent } from '~/app/composables/useContent'

const { programs } = useContent()
const allPrograms = programs()

const filter = ref<'all' | 'flagship'>('all')
const visible = computed(() =>
  filter.value === 'flagship'
    ? allPrograms.filter((p) => p.isFlagship)
    : allPrograms,
)
</script>

<template>
  <SectionShell id="programs" tone="muted" eyebrow="What we train" title="12 disciplines. One team.">
    <template #subtitle>
      From India's only calisthenics-first approach to MMA, mace and mudgar training — find your
      discipline or mix them all.
    </template>

    <!-- Filter -->
    <div class="mb-8 flex justify-center gap-2">
      <button
        v-for="opt in [
          { v: 'all', l: 'All programs' },
          { v: 'flagship', l: 'Flagship' },
        ]"
        :key="opt.v"
        class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
        :class="
          filter === opt.v
            ? 'bg-accent-400 text-ink-950'
            : 'bg-white/5 text-zinc-300 hover:bg-white/10'
        "
        @click="filter = opt.v as 'all' | 'flagship'"
      >
        {{ opt.l }}
      </button>
    </div>

    <!-- Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="program in visible"
        :key="program.slug"
        :to="`/programs/${program.slug}`"
        class="group card-surface relative overflow-hidden p-6 transition-all hover:border-accent-400/50 hover:bg-ink-700/80"
      >
        <!-- Flagship ribbon -->
        <span
          v-if="program.isFlagship"
          class="absolute right-4 top-4 rounded-full bg-accent-400/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-300"
        >
          Flagship
        </span>

        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors group-hover:bg-accent-400 group-hover:text-ink-950"
        >
          <Icon :name="program.icon" class="h-6 w-6" />
        </div>

        <h3 class="mt-4 font-display text-xl">{{ program.title }}</h3>
        <p class="mt-1 text-sm font-medium text-accent-300">{{ program.tagline }}</p>
        <p class="mt-3 text-sm text-zinc-400">{{ program.description }}</p>

        <p class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-300 group-hover:text-accent-300">
          Learn more
          <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </p>
      </NuxtLink>
    </div>
  </SectionShell>
</template>
