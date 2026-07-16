<script setup lang="ts">
import { brand, telLink, whatsappLink, instagramUrl } from '~/app/theme.config'

const waMessage = `Hi ${brand.name}! I'd like to book a free trial.`

// Google Maps embed (no API key needed for basic embed via query).
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  brand.address.mapQuery,
)}&output=embed`
</script>

<template>
  <SectionShell id="contact" tone="muted" eyebrow="Get started" title="Book your free trial.">
    <template #subtitle>
      Fill the form and we'll call you back the same day. Or reach us directly — we're open
      {{ brand.hours[0]?.time }}.
    </template>

    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Form -->
      <div>
        <LeadForm endpoint="/api/leads" variant="trial" />
      </div>

      <!-- Contact details + map -->
      <div class="flex flex-col gap-6">
        <div class="card-surface p-6">
          <h3 class="font-display text-lg">Reach us directly</h3>
          <div class="mt-4 space-y-4 text-sm">
            <!-- Phones -->
            <div v-for="phone in brand.contact.phones" :key="phone.number" class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-400/15 text-accent-400">
                <Icon name="lucide:phone" class="h-4 w-4" />
              </div>
              <a :href="telLink(phone.number)" class="text-zinc-200 hover:text-accent-300">
                {{ phone.label }}
              </a>
            </div>
            <!-- WhatsApp -->
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-400/15 text-accent-400">
                <Icon name="lucide:message-circle" class="h-4 w-4" />
              </div>
              <a
                :href="whatsappLink(brand.contact.whatsapp, waMessage)"
                target="_blank"
                rel="noopener"
                class="text-zinc-200 hover:text-accent-300"
              >
                WhatsApp us
              </a>
            </div>
            <!-- Instagram -->
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-400/15 text-accent-400">
                <Icon name="lucide:instagram" class="h-4 w-4" />
              </div>
              <a :href="instagramUrl" target="_blank" rel="noopener" class="text-zinc-200 hover:text-accent-300">
                @{{ brand.contact.instagram }}
              </a>
            </div>
            <!-- Address -->
            <div class="flex items-start gap-3">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-400/15 text-accent-400">
                <Icon name="lucide:map-pin" class="h-4 w-4" />
              </div>
              <address class="not-italic text-zinc-300">
                {{ brand.address.line1 }}<br />
                {{ brand.address.line2 }}<br />
                {{ brand.address.city }}, {{ brand.address.region }} {{ brand.address.postalCode }}
              </address>
            </div>
            <!-- Hours -->
            <div class="flex items-start gap-3">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-400/15 text-accent-400">
                <Icon name="lucide:clock" class="h-4 w-4" />
              </div>
              <div class="text-zinc-300">
                <p v-for="h in brand.hours.filter((x) => x.time)" :key="h.days">
                  {{ h.days }}: {{ h.time }}
                </p>
                <p class="text-accent-300">{{ brand.hours.find((h) => h.note)?.note }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="card-surface overflow-hidden">
          <iframe
            :src="mapEmbed"
            class="h-64 w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Anchor Strength location"
          />
        </div>
      </div>
    </div>
  </SectionShell>
</template>
