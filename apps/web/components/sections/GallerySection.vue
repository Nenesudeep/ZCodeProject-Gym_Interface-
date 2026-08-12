<script setup lang="ts">
import { useContent } from '~/app/composables/useContent'

const { gallery } = useContent()
const items = gallery()
</script>

<template>
  <SectionShell id="gallery" tone="muted" eyebrow="Inside the box" title="The space & the energy.">
    <template #subtitle>
      A peek at the floor, the rig and the community. More training photos and reels are coming
      soon.
    </template>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="group relative aspect-square overflow-hidden rounded-2xl border border-white/10"
        :class="i === 0 ? 'col-span-2 row-span-2 aspect-auto lg:aspect-auto' : ''"
      >
        <!-- Image with gradient fallback for CMS items that are not uploaded yet. -->
        <img
          v-if="item.image"
          :src="item.image"
          :alt="`${item.title}: ${item.caption}`"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          v-else
          class="absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105"
          :class="item.gradient"
        />
        <div
          class="absolute inset-0 opacity-20"
          style="background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 24px 24px;"
        />

        <!-- Type badge -->
        <span
          class="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-ink-950/60 px-2.5 py-1 text-xs text-white backdrop-blur"
        >
          <Icon :name="item.type === 'reel' ? 'lucide:play' : 'lucide:image'" class="h-3.5 w-3.5" />
          {{ item.type }}
        </span>

        <!-- Caption overlay -->
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4">
          <h3 class="font-display text-lg text-white">{{ item.title }}</h3>
          <p class="text-xs text-zinc-300">{{ item.caption }}</p>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
