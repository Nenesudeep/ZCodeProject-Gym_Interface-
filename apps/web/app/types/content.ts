// ════════════════════════════════════════════════════════════
// Content types — mirror the Strapi CMS content models.
// In v1 these are satisfied by the static seed in `content/seed.ts`;
// in v2 the same shapes come back from the CMS API.
// ════════════════════════════════════════════════════════════

export interface Program {
  slug: string
  title: string
  /** Short tagline shown on cards. */
  tagline: string
  /** Icon name from @nuxt/icon (Lucide set). */
  icon: string
  description: string
  /** Long-form copy for the detail page / SEO. */
  body: string[]
  isFlagship?: boolean
  /** SEO: what someone searches to find this. */
  keywords: string[]
}

export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  slug: string
  name: string
  price: number
  currency: 'INR'
  period: string /** "month", "12 months", etc. */
  priceNote?: string
  description: string
  features: PricingFeature[]
  isFlagship?: boolean
  isPromo?: boolean
  ctaLabel: string
}

export interface Trainer {
  name: string
  specialty: string
  bio: string
  certifications: string[]
}

export interface Testimonial {
  name: string
  quote: string
  rating: number
  source: string
  /** e.g. "Member since 2022" */
  context?: string
}

export interface Faq {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  body: string[]
  date: string
  author: string
  tags: string[]
}

export interface GalleryItem {
  type: 'photo' | 'reel'
  title: string
  caption: string
  /** Placeholder gradient class until real media is uploaded. */
  gradient: string
}
