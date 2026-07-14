// ════════════════════════════════════════════════════════════
// Anchor Strength — central branding & contact config.
// SINGLE SOURCE OF TRUTH. Swap logo/colors/phones here once the
// real assets arrive — no layout changes needed.
// In v2 these values stream from the CMS Brand singleton instead.
// ════════════════════════════════════════════════════════════

export interface BrandConfig {
  name: string
  shortName: string
  tagline: string
  subTagline: string
  logo: {
    src: string
    alt: string
    /** Width/height ratio for layout stability. */
    width: number
    height: number
  }
  contact: {
    phones: { label: string; number: string /** E.164, no + */ }[]
    whatsapp: string /** E.164, no + */
    email: string
    instagram: string /** handle without @ */
    facebook?: string
  }
  address: {
    line1: string
    line2: string
    city: string
    region: string
    postalCode: string
    country: string
    /** Google Maps embed query. */
    mapQuery: string
    /** Geo for schema.org. */
    lat: number
    lng: number
  }
  hours: { days: string; time: string; note?: string }[]
  /** Reputation summary for social proof. */
  rating: { score: number; count: number; source: string }
}

export const brand: BrandConfig = {
  name: 'Anchor Strength',
  shortName: 'Anchor',
  tagline: "Boduppal's 1st Calisthenics Gym",
  subTagline: 'Join a team, not just a gym!',
  logo: {
    // Placeholder anchor mark until the real logo is provided.
    src: '/brand/anchor-logo-placeholder.svg',
    alt: 'Anchor Strength logo',
    width: 160,
    height: 40,
  },
  contact: {
    phones: [
      { label: '+91 93790 66066', number: '919379066066' },
      { label: '+91 79894 58980', number: '917989458980' },
    ],
    whatsapp: '919379066066',
    email: 'anchorstrengthofficial@gmail.com',
    instagram: 'anchorstrengthofficial',
    facebook: 'anchorstrengthofficial',
  },
  address: {
    line1: '2nd Floor, Achaiah Complex, Boduppal Rd',
    line2: 'Above SBI Bank, Mallikarjuna Nagar',
    city: 'Hyderabad',
    region: 'Telangana',
    postalCode: '500092',
    country: 'IN',
    mapQuery: 'Anchor Strength Gym Boduppal Hyderabad',
    lat: 17.4126,
    lng: 78.5646,
  },
  hours: [
    { days: 'Mon – Sat', time: '5:00 AM – 10:00 PM' },
    { days: 'Sunday', time: '5:00 AM – 9:00 PM' },
    { days: '', time: '', note: 'Open 365 days a year' },
  ],
  rating: { score: 5.0, count: 131, source: 'Justdial' },
}

/** Convenience helpers used across components. */
export const telLink = (number: string) => `tel:+${number}`
export const whatsappLink = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`
export const instagramUrl = `https://instagram.com/${brand.contact.instagram}`
