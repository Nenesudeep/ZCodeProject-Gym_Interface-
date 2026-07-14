<script setup lang="ts">
/**
 * Vertical section band with optional eyebrow + heading pattern.
 * Provides consistent rhythm between page sections.
 */
withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    align?: 'left' | 'center'
    /** Tone controls background. */
    tone?: 'default' | 'muted' | 'brand'
    id?: string
  }>(),
  { align: 'left', tone: 'default' },
)

const toneClass = {
  default: 'bg-ink-950',
  muted: 'bg-ink-900',
  brand: 'bg-gradient-to-b from-brand-950 to-ink-950',
}
</script>

<template>
  <section :id="id" class="py-16 sm:py-24" :class="toneClass[tone]">
    <AppContainer>
      <div
        v-if="eyebrow || title"
        class="mb-10 sm:mb-14"
        :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'"
      >
        <p v-if="eyebrow" class="eyebrow mb-3" :class="align === 'center' ? 'justify-center' : ''">
          <span class="h-px w-6 bg-accent-400" />
          {{ eyebrow }}
        </p>
        <h2 v-if="title" class="text-3xl font-bold sm:text-4xl lg:text-5xl">
          {{ title }}
        </h2>
        <p v-if="$slots.subtitle" class="mt-4 text-lg text-zinc-400">
          <slot name="subtitle" />
        </p>
      </div>
      <slot />
    </AppContainer>
  </section>
</template>
