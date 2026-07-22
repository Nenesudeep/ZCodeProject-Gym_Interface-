<script setup lang="ts">
import { ref } from 'vue'
import { brand, telLink, whatsappLink } from '~/app/theme.config'

// Nav links scroll to anchored home sections.
const navLinks = [
  { label: 'Programs', to: '/#programs' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const mobileOpen = ref(false)

const close = () => (mobileOpen.value = false)

const waMessage = `Hi ${brand.name}! I'd like to know more about your memberships.`
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl"
  >
    <AppContainer>
      <div class="flex h-16 items-center justify-between gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5" @click="close">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-display text-xl text-white"
          >
            ⚓
          </span>
          <span class="font-display text-xl tracking-wide text-white">
            {{ brand.shortName }} Strength
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-1 lg:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Desktop CTAs -->
        <div class="hidden items-center gap-2 lg:flex">
          <AppButton
            :href="telLink(brand.contact.phones[0]!.number)"
            variant="ghost"
            size="sm"
          >
            <Icon name="lucide:phone" class="h-4 w-4" />
            Call
          </AppButton>
          <AppButton :href="whatsappLink(brand.contact.whatsapp, waMessage)" size="sm">
            <Icon name="lucide:message-circle" class="h-4 w-4" />
            Free Trial
          </AppButton>
        </div>

        <!-- Mobile toggle -->
        <button
          class="rounded-lg p-2 text-zinc-300 lg:hidden"
          aria-label="Toggle menu"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="h-6 w-6" />
        </button>
      </div>
    </AppContainer>

    <!-- Mobile drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-if="mobileOpen" id="mobile-nav" class="border-t border-white/5 bg-ink-950 lg:hidden">
        <AppContainer class="py-4">
          <nav class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="rounded-lg px-4 py-3 text-base font-medium text-zinc-200 hover:bg-white/5"
              @click="close"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
          <div class="mt-4 flex gap-2">
            <AppButton :href="telLink(brand.contact.phones[0]!.number)" variant="outline" block>
              <Icon name="lucide:phone" class="h-4 w-4" /> Call
            </AppButton>
            <AppButton :href="whatsappLink(brand.contact.whatsapp, waMessage)" block>
              Free Trial
            </AppButton>
          </div>
        </AppContainer>
      </div>
    </Transition>
  </header>
</template>
