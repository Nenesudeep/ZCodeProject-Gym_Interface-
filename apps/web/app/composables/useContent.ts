import type {
  Program,
  PricingPlan,
  Trainer,
  Testimonial,
  Faq,
  Article,
  GalleryItem,
} from '../types/content'
import { programs, programBySlug } from '../content/programs'
import { pricingPlans } from '../content/pricing'
import { trainers, testimonials, faqs, galleryItems } from '../content/social-proof'
import { articles, articleBySlug } from '../content/articles'

/**
 * Central content access for the frontend.
 *
 * v1: returns statically-seeded data (researched Anchor Strength content).
 * v2: the same functions swap to fetch from the Strapi CMS via useAsyncData,
 *     with SSR + ISR caching — components and pages do not change.
 *
 * Always call inside setup() / plugin context so the future useAsyncData
 * swap is drop-in.
 */
export function useContent() {
  return {
    programs: (): Program[] => programs,
    program: programBySlug,

    pricing: (): PricingPlan[] => pricingPlans,

    trainers: (): Trainer[] => trainers,
    testimonials: (): Testimonial[] => testimonials,
    faqs: (): Faq[] => faqs,
    gallery: (): GalleryItem[] => galleryItems,

    articles: (): Article[] => articles,
    article: articleBySlug,
  }
}
