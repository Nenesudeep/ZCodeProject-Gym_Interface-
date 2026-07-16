<script setup lang="ts">
import { ref } from 'vue'
import { useContent } from '~/app/composables/useContent'

const { faqs } = useContent()
const items = faqs()

const open = ref<number | null>(0)
const toggle = (i: number) => (open.value = open.value === i ? null : i)
</script>

<template>
  <SectionShell id="faq" tone="default" eyebrow="Questions" title="Before you ask.">
    <template #subtitle>
      Everything you need to know. Still curious? Just message us — we reply fast.
    </template>

    <div class="mx-auto max-w-3xl divide-y divide-white/5">
      <div v-for="(item, i) in items" :key="i" class="py-2">
        <button
          class="flex w-full items-center justify-between gap-4 py-4 text-left"
          :aria-expanded="open === i"
          @click="toggle(i)"
        >
          <span class="font-display text-lg text-white">{{ item.question }}</span>
          <Icon
            name="lucide:chevron-down"
            class="h-5 w-5 shrink-0 text-accent-400 transition-transform"
            :class="open === i ? 'rotate-180' : ''"
          />
        </button>
        <Transition
          enter-active-class="grid transition-all duration-200 ease-out"
          enter-from-class="grid-rows-[0fr] opacity-0"
          enter-to-class="grid-rows-[1fr] opacity-100"
          leave-active-class="grid transition-all duration-150 ease-in"
          leave-from-class="grid-rows-[1fr] opacity-100"
          leave-to-class="grid-rows-[0fr] opacity-0"
        >
          <div v-show="open === i" class="overflow-hidden">
            <p class="pb-4 pr-8 text-sm leading-relaxed text-zinc-400">{{ item.answer }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </SectionShell>
</template>
