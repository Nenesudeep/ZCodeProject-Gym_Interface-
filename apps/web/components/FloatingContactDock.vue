<script setup lang="ts">
import { brand, telLink, whatsappLink } from '~/app/theme.config'

// Matches/beats the reference site's WhatsApp widget — adds a call button too.
const waMessage = `Hi ${brand.name}! I'd like to book a free trial.`
</script>

<template>
  <div class="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
    <a
      :href="telLink(brand.contact.phones[0]!.number)"
      aria-label="Call us"
      class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-white/20"
    >
      <Icon name="lucide:phone" class="h-5 w-5" />
    </a>
    <a
      :href="whatsappLink(brand.contact.whatsapp, waMessage)"
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      class="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent-400 text-ink-950 shadow-xl transition-all hover:scale-110"
    >
      <Icon name="lucide:message-circle" class="h-6 w-6" />
      <span class="absolute inset-0 animate-ping rounded-full bg-accent-400 opacity-40" />
    </a>
  </div>
</template>
