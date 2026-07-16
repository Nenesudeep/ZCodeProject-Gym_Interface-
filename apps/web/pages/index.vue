<script setup lang="ts">
import { useSchemaOrg } from '~/app/composables/useSchemaOrg'

// Home page — single long-scroll marketing page assembled from sections.
// This is the SEO landing page; SSR renders it server-side.

useSeoMeta({
  title: 'Anchor Strength — Boduppal\'s 1st Calisthenics Gym | Hyderabad',
  description:
    'Calisthenics, MMA, kettlebell group training, yoga, dance & more in Boduppal, Hyderabad. Join a team, not just a gym. Free trial available. Open 365 days, 5 AM–10 PM.',
  ogTitle: 'Anchor Strength — Boduppal\'s 1st Calisthenics Gym',
  ogDescription:
    'East Hyderabad\'s most complete strength & functional training gym. Calisthenics, MMA, kettlebell, yoga & more. Book a free trial today.',
  ogType: 'website',
})

// Local business structured data for Google rich results.
useSchemaOrg()
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ProgramsSection />
    <PricingSection />
    <GallerySection />
    <TestimonialsSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>
