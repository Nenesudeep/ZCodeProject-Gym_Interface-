import type { PricingPlan } from '../types/content'

// Headline rate ₹1,500/mo (researched). Promotional tiers flagged so the
// UI can render them as "limited offer" — owner confirms exact prices in CMS.
export const pricingPlans: PricingPlan[] = [
  {
    slug: 'monthly',
    name: 'Monthly',
    price: 1500,
    currency: 'INR',
    period: 'month',
    description: 'Flexible, no long-term commitment. Perfect to get started.',
    ctaLabel: 'Start training',
    features: [
      { text: 'Full open gym access', included: true },
      { text: 'All group training classes', included: true },
      { text: 'Locker & shower facilities', included: true },
      { text: 'Personal training', included: false },
      { text: 'Free trial session', included: true },
    ],
  },
  {
    slug: '24-month',
    name: '24-Month',
    price: 13500,
    currency: 'INR',
    period: '24 months',
    priceNote: 'Best value',
    description: 'Lock in the lowest monthly rate. For members who are all in.',
    isFlagship: true,
    ctaLabel: 'Claim this plan',
    features: [
      { text: 'Everything in Monthly', included: true },
      { text: 'Lowest effective monthly rate', included: true },
      { text: 'Priority class booking (v2)', included: true },
      { text: '1 free PT session / month', included: true },
      { text: 'Free trial session', included: true },
    ],
  },
  {
    slug: 'couple-promo',
    name: 'Couple Membership',
    price: 499,
    currency: 'INR',
    period: 'limited offer',
    priceNote: 'Limited time',
    description: 'Train together. Any two people — friends, partners, family.',
    isPromo: true,
    ctaLabel: 'Grab the offer',
    features: [
      { text: 'Two memberships, one price', included: true },
      { text: 'Full gym + group classes', included: true },
      { text: 'Both members get full access', included: true },
      { text: 'Subject to availability', included: true },
      { text: 'Confirm current rate with us', included: true },
    ],
  },
]
