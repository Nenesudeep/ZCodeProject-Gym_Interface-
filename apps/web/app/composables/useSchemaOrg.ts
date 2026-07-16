import { brand } from '~/app/theme.config'

/**
 * Emits Schema.org JSON-LD structured data for local SEO.
 * Renders a HealthClub (subtype of LocalBusiness) so Google can index
 * name, address, hours, phone and aggregate rating.
 *
 * Usage in any page: `useSchemaOrg()` inside <script setup>.
 */
export function useSchemaOrg() {
  const fullAddress = `${brand.address.line1}, ${brand.address.line2}, ${brand.address.city}, ${brand.address.region} ${brand.address.postalCode}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    '@id': `${brand.address.mapQuery}#healthclub`,
    name: brand.name,
    description: `${brand.tagline}. Calisthenics, MMA, kettlebell group training, yoga, dance, animal flow, mudgars, steel mace, arm wrestling and more in ${brand.address.city}.`,
    image: `https://anchorstrength.fit/og-default.jpg`,
    url: 'https://anchorstrength.fit',
    telephone: `+${brand.contact.phones[0]?.number}`,
    email: brand.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${brand.address.line1}, ${brand.address.line2}`,
      addressLocality: brand.address.city,
      addressRegion: brand.address.region,
      postalCode: brand.address.postalCode,
      addressCountry: brand.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: brand.address.lat,
      longitude: brand.address.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '05:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '05:00',
        closes: '21:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: brand.rating.score,
      reviewCount: brand.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [
      `https://instagram.com/${brand.contact.instagram}`,
      brand.contact.facebook
        ? `https://facebook.com/${brand.contact.facebook}`
        : '',
    ].filter(Boolean),
    makesOffer: [
      'Calisthenics',
      'MMA',
      'Kettlebell Group Training',
      'Yoga',
      'Personal Training',
    ],
  }

  // useHead injects a <script type="application/ld+json"> into the page head.
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
      },
    ],
  })
}
