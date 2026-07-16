<script setup lang="ts">
import { useContent } from '~/app/composables/useContent'

const route = useRoute()
const { program } = useContent()
const slug = computed(() => route.params.slug as string)
const found = computed(() => program(slug.value))

// 404 if the slug doesn't match a program.
if (!found.value) {
  throw createError({ statusCode: 404, statusMessage: 'Program not found', fatal: true })
}

const p = found.value!

useSeoMeta({
  title: `${p.title} in Hyderabad — Anchor Strength`,
  description: p.description,
  ogTitle: `${p.title} — Anchor Strength, Boduppal`,
  ogDescription: p.description,
})
</script>

<template>
  <div>
    <!-- Hero band -->
    <section class="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-brand-950 to-ink-950">
      <AppContainer class="py-16 sm:py-20">
        <NuxtLink to="/#programs" class="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent-300">
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
          All programs
        </NuxtLink>

        <div class="mt-6 flex items-start gap-5">
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-400 text-ink-950"
          >
            <Icon :name="p.icon" class="h-8 w-8" />
          </div>
          <div>
            <p v-if="p.isFlagship" class="eyebrow mb-2">
              <span class="h-px w-6 bg-accent-400" /> Flagship program
            </p>
            <h1 class="font-display text-4xl sm:text-5xl">{{ p.title }}</h1>
            <p class="mt-1 text-lg text-accent-300">{{ p.tagline }}</p>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- Body + sidebar -->
    <SectionShell tone="default">
      <div class="grid gap-10 lg:grid-cols-3">
        <article class="lg:col-span-2">
          <div class="prose prose-invert max-w-none">
            <p v-for="(para, i) in p.body" :key="i" class="mb-4 text-lg leading-relaxed text-zinc-300">
              {{ para }}
            </p>
          </div>

          <!-- Keywords as tags -->
          <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="kw in p.keywords"
              :key="kw"
              class="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400"
            >
              {{ kw }}
            </span>
          </div>
        </article>

        <!-- CTA sidebar -->
        <aside class="lg:col-span-1">
          <div class="sticky top-24 card-surface p-6">
            <h3 class="font-display text-xl">Try {{ p.title }}</h3>
            <p class="mt-2 text-sm text-zinc-400">
              Book a free trial session and experience it for yourself. No commitment.
            </p>
            <LeadForm endpoint="/api/leads" :default-program="p.slug" class="mt-4 !p-0 !bg-transparent !border-0 !backdrop-blur-none" />
          </div>
        </aside>
      </div>
    </SectionShell>
  </div>
</template>
