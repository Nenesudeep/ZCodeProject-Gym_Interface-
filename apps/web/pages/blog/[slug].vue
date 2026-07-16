<script setup lang="ts">
import { useContent } from '~/app/composables/useContent'

const route = useRoute()
const { article } = useContent()
const slug = computed(() => route.params.slug as string)
const found = computed(() => article(slug.value))

if (!found.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const post = found.value!

useSeoMeta({
  title: `${post.title} | Anchor Strength Blog`,
  description: post.excerpt,
  ogTitle: post.title,
  ogDescription: post.excerpt,
  ogType: 'article',
})
</script>

<template>
  <div>
    <section class="border-b border-white/5 bg-gradient-to-b from-brand-950 to-ink-950">
      <AppContainer class="py-14 sm:py-18">
        <NuxtLink to="/blog" class="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent-300">
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
          All articles
        </NuxtLink>
        <h1 class="mt-6 max-w-3xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
          {{ post.title }}
        </h1>
        <div class="mt-4 flex items-center gap-3 text-sm text-zinc-500">
          <time>{{ new Date(post.date).toLocaleDateString('en-IN', { dateStyle: 'long' }) }}</time>
          <span>·</span>
          <span>{{ post.author }}</span>
        </div>
      </AppContainer>
    </section>

    <SectionShell tone="default">
      <article class="mx-auto max-w-3xl">
        <p class="mb-8 text-lg font-medium text-accent-300">{{ post.excerpt }}</p>
        <div v-for="(para, i) in post.body" :key="i" class="mb-5 text-lg leading-relaxed text-zinc-300">
          {{ para }}
        </div>

        <!-- CTA -->
        <div class="mt-12 rounded-2xl border border-accent-400/30 bg-accent-400/5 p-6 text-center">
          <h3 class="font-display text-xl">Ready to train with us?</h3>
          <p class="mt-2 text-sm text-zinc-400">Book a free trial at Anchor Strength today.</p>
          <AppButton to="/#contact" class="mt-4">
            <Icon name="lucide:calendar-check" class="h-4 w-4" />
            Book free trial
          </AppButton>
        </div>
      </article>
    </SectionShell>
  </div>
</template>
