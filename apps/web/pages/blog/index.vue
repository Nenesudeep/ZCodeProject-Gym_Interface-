<script setup lang="ts">
import { useContent } from '~/app/composables/useContent'

const { articles } = useContent()
const posts = articles()

useSeoMeta({
  title: 'Blog — Training Tips & Guides | Anchor Strength',
  description:
    'Workout tips, training guides and fitness advice from Anchor Strength, Boduppal\'s first calisthenics gym in Hyderabad.',
})
</script>

<template>
  <SectionShell tone="default" eyebrow="Journal" title="Training tips & guides.">
    <template #subtitle>
      Practical advice to help you train smarter. Written by the Anchor Strength team.
    </template>

    <div class="grid gap-6 sm:grid-cols-2">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="group card-surface flex flex-col overflow-hidden p-6 transition-all hover:border-accent-400/50"
      >
        <div class="flex items-center gap-3 text-xs text-zinc-500">
          <time>{{ new Date(post.date).toLocaleDateString('en-IN', { dateStyle: 'medium' }) }}</time>
          <span>·</span>
          <span>{{ post.author }}</span>
        </div>
        <h3 class="mt-3 font-display text-xl group-hover:text-accent-300">{{ post.title }}</h3>
        <p class="mt-2 flex-1 text-sm text-zinc-400">{{ post.excerpt }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-zinc-400"
          >
            #{{ tag }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </SectionShell>
</template>
