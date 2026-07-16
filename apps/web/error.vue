<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)

const handleError = () => clearError({ redirect: '/' })

useSeoMeta({
  title: is404.value ? 'Page not found — Anchor Strength' : 'Something went wrong',
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-4 text-center">
    <span class="text-7xl">⚓</span>
    <h1 class="mt-6 font-display text-6xl text-accent-400">
      {{ error?.statusCode || 500 }}
    </h1>
    <p class="mt-3 max-w-md text-lg text-zinc-400">
      <template v-if="is404">
        We couldn't find that page. It may have moved or never existed.
      </template>
      <template v-else>
        Something broke on our end. We're on it — try again in a moment.
      </template>
    </p>
    <div class="mt-8 flex gap-3">
      <AppButton @click="handleError">
        <Icon name="lucide:home" class="h-4 w-4" />
        Back to home
      </AppButton>
      <AppButton to="/#contact" variant="outline">
        <Icon name="lucide:phone" class="h-4 w-4" />
        Contact us
      </AppButton>
    </div>
  </div>
</template>
