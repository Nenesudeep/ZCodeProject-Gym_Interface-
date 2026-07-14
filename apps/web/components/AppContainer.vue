<script setup lang="ts">
/**
 * Centered max-width content wrapper. Use inside <Section>.
 */
withDefaults(defineProps<{ as?: string; size?: 'default' | 'narrow' | 'wide' }>(), {
  as: 'div',
  size: 'default',
})

const maxWidth = {
  default: 'max-w-content',
  narrow: 'max-w-3xl',
  wide: 'max-w-6xl',
}
</script>

<template>
  <component :is="as" class="mx-auto w-full px-4 sm:px-6 lg:px-8" :class="maxWidth[size]">
    <slot />
  </component>
</template>
