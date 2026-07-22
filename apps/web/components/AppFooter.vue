<script setup lang="ts">
import { brand, telLink, whatsappLink, instagramUrl } from '~/app/theme.config'

const year = new Date().getFullYear()
const waMessage = `Hi ${brand.name}! I have a question.`
</script>

<template>
  <footer class="border-t border-white/5 bg-ink-950">
    <AppContainer class="py-14">
      <div class="grid gap-10 lg:grid-cols-4">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2.5">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-display text-xl text-white"
            >
              ⚓
            </span>
            <span class="font-display text-xl tracking-wide text-white">{{ brand.name }}</span>
          </div>
          <p class="mt-4 max-w-sm text-sm text-zinc-400">
            {{ brand.tagline }}. {{ brand.subTagline }} Calisthenics, MMA, kettlebell group
            training, yoga and more — all under one roof in Boduppal, Hyderabad.
          </p>
          <div class="mt-6 flex gap-3">
            <a
              :href="instagramUrl"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-accent-400 hover:text-ink-950"
            >
              <Icon name="lucide:instagram" class="h-5 w-5" />
            </a>
            <a
              :href="whatsappLink(brand.contact.whatsapp, waMessage)"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-accent-400 hover:text-ink-950"
            >
              <Icon name="lucide:message-circle" class="h-5 w-5" />
            </a>
            <a
              v-for="phone in brand.contact.phones"
              :key="phone.number"
              :href="telLink(phone.number)"
              :aria-label="`Call ${phone.label}`"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-accent-400 hover:text-ink-950"
            >
              <Icon name="lucide:phone" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h3 class="font-display text-sm uppercase tracking-wider text-zinc-500">Explore</h3>
          <ul class="mt-4 space-y-3 text-sm">
            <li><NuxtLink to="/#programs" class="text-zinc-400 hover:text-accent-300">Programs</NuxtLink></li>
            <li><NuxtLink to="/#pricing" class="text-zinc-400 hover:text-accent-300">Pricing</NuxtLink></li>
            <li><NuxtLink to="/#reviews" class="text-zinc-400 hover:text-accent-300">Reviews</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-zinc-400 hover:text-accent-300">Blog</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-zinc-400 hover:text-accent-300">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-display text-sm uppercase tracking-wider text-zinc-500">Visit us</h3>
          <address class="mt-4 space-y-3 text-sm not-italic text-zinc-400">
            <p>
              {{ brand.address.line1 }}<br />
              {{ brand.address.line2 }}<br />
              {{ brand.address.city }}, {{ brand.address.region }} {{ brand.address.postalCode }}
            </p>
            <p v-for="phone in brand.contact.phones" :key="phone.number">
              <a :href="telLink(phone.number)" class="hover:text-accent-300">{{ phone.label }}</a>
            </p>
            <p v-for="h in brand.hours.filter((x) => x.time)" :key="h.days" class="text-xs">
              {{ h.days }}: {{ h.time }}
            </p>
          </address>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-zinc-500 sm:flex-row"
      >
        <p>© {{ year }} {{ brand.name }}. All rights reserved.</p>
        <p>{{ brand.rating.source }} {{ brand.rating.score }} ★ · {{ brand.rating.count }} reviews</p>
      </div>
    </AppContainer>
  </footer>
</template>
