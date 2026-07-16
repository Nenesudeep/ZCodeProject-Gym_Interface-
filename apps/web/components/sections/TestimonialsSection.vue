<script setup lang="ts">
import { ref } from 'vue'
import { useContent } from '~/app/composables/useContent'
import { brand } from '~/app/theme.config'

const { testimonials } = useContent()
const reviews = testimonials()

const active = ref(0)

const next = () => (active.value = (active.value + 1) % reviews.length)
const prev = () => (active.value = (active.value - 1 + reviews.length) % reviews.length)
</script>

<template>
  <SectionShell id="reviews" tone="default" eyebrow="Social proof" title="Loved by the community.">
    <template #subtitle>
      {{ brand.rating.score }} stars across {{ brand.rating.count }}+ reviews on
      {{ brand.rating.source }}. Here's what members say.
    </template>

    <div class="mx-auto max-w-3xl">
      <!-- Carousel -->
      <div class="relative">
        <div class="overflow-hidden">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-x-4"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="absolute inset-0"
          >
            <blockquote :key="active" class="card-surface p-8 text-center sm:p-12">
              <!-- Stars -->
              <div class="mb-4 flex justify-center gap-0.5">
                <Icon
                  v-for="n in reviews[active]!.rating"
                  :key="n"
                  name="lucide:star"
                  class="h-5 w-5 fill-accent-400 text-accent-400"
                />
              </div>
              <p class="font-display text-xl leading-relaxed text-zinc-100 sm:text-2xl">
                "{{ reviews[active]!.quote }}"
              </p>
              <footer class="mt-6">
                <p class="font-semibold text-accent-300">{{ reviews[active]!.name }}</p>
                <p class="text-sm text-zinc-500">
                  {{ reviews[active]!.context ?? reviews[active]!.source }}
                </p>
              </footer>
            </blockquote>
          </Transition>
        </div>

        <!-- Controls -->
        <button
          v-if="reviews.length > 1"
          aria-label="Previous"
          class="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-accent-400 hover:text-ink-950"
          @click="prev"
        >
          <Icon name="lucide:chevron-left" class="h-5 w-5" />
        </button>
        <button
          v-if="reviews.length > 1"
          aria-label="Next"
          class="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-accent-400 hover:text-ink-950"
          @click="next"
        >
          <Icon name="lucide:chevron-right" class="h-5 w-5" />
        </button>
      </div>

      <!-- Dots -->
      <div class="mt-6 flex justify-center gap-2">
        <button
          v-for="(_, i) in reviews"
          :key="i"
          class="h-2 rounded-full transition-all"
          :class="i === active ? 'w-8 bg-accent-400' : 'w-2 bg-white/20'"
          :aria-label="`Review ${i + 1}`"
          @click="active = i"
        />
      </div>
    </div>
  </SectionShell>
</template>
