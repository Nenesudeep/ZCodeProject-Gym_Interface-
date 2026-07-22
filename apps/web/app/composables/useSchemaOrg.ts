import { brand } from '~/app/theme.config'

/**
 * Emits Schema.org JSON-LD structured data for local SEO.
 * Renders a HealthClub (subtype of LocalBusiness) so Google can index
 * name, address, hours, phone and aggregate rating.
 *
 * Usage in any page: `useSchemaOrg()` inside <script setup>.
 */
export function useSchemaOrg() {
  const site = useSiteConfig()
  const siteUrl = String(site.url || 'https://anchorstrength.fit').replace(/\/$/, '')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    '@id': `${siteUrl}/#healthclub`,
    name: brand.name,
    description: `${brand.tagline}. Calisthenics, MMA, kettlebell group training, yoga, dance, animal flow, mudgars, steel mace, arm wrestling and more in ${brand.address.city}.`,
    image: `${siteUrl}/og-default.jpg`,
    url: siteUrl,
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
      brand.contact.facebook ? `https://facebook.com/${brand.contact.facebook}` : '',
    ].filter(Boolean),
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Calisthenics' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MMA' } },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Kettlebell Group Training' },
      },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yoga' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Personal Training' } },
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
