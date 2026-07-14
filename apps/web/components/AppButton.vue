<script setup lang="ts">
import { computed } from 'vue'

/**
 * Polymorphic button: renders <NuxtLink> for internal routes, <a> for
 * external/tel/mailto, or <button> otherwise. Single API for all CTAs.
 */
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const variantClass = {
  primary: 'bg-accent-400 text-ink-950 hover:bg-accent-300 font-semibold',
  secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur',
  outline: 'border border-white/20 text-white hover:border-accent-400 hover:text-accent-300',
  ghost: 'text-zinc-300 hover:text-white hover:bg-white/5',
}

const sizeClass = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const isExternal = computed(() => {
  if (!props.href) return false
  return /^(https?:|tel:|mailto:|wa\.me)/.test(props.href)
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variantClass[variant], sizeClass[size], block ? 'w-full' : '']"
  >
    <slot />
  </component>
</template>
