import type { Article } from '../types/content'

// SEO seed articles — long-tail content marketing the reference site has none of.
export const articles: Article[] = [
  {
    slug: 'calisthenics-for-beginners-hyderabad',
    title: 'Calisthenics for Beginners in Hyderabad: A Complete Starter Guide',
    excerpt:
      'Everything a Hyderabad beginner needs to know before starting calisthenics — what to expect, what you will need, and how Anchor Strength gets you from zero to your first pull-up.',
    body: [
      'Calisthenics — training with your own bodyweight — is one of the most accessible and rewarding ways to build real, functional strength. If you are in Hyderabad and curious about where to start, this guide is for you.',
      'Unlike weight training, calisthenics needs almost no equipment to begin. A pull-up bar and a set of parallel bars are enough to unlock months of progress. What you do need is structure: a curriculum that meets you at your level and progresses intelligently.',
      'At Anchor Strength in Boduppal, our beginner calisthenics track starts with the fundamentals — scapular pulls, hollow body holds, incline push-ups and active hangs. Most beginners see their first unassisted pull-up within three to four months of consistent training.',
      'Hyderabad’s climate makes early morning the ideal time to train. Our 5:00 AM opening means you can get a session in before work, every day of the week.',
      'Ready to start? Book a free trial and train with Boduppal’s first dedicated calisthenics gym.',
    ],
    date: '2025-01-15',
    author: 'Anchor Strength',
    tags: ['calisthenics', 'beginners', 'hyderabad'],
  },
  {
    slug: 'kettlebell-vs-free-weights',
    title: 'Kettlebell Training vs Free Weights: Which Is Right for You?',
    excerpt:
      'Both build strength — but they build it differently. We break down when to choose kettlebells, when to choose barbells, and how we use both at Anchor Strength.',
    body: [
      'Walk into any gym and you will see two camps: the free-weight lifters and the kettlebell swingers. Both are right — for different goals.',
      'Free weights (barbells and dumbbells) excel at building maximal strength and muscle mass. If your goal is to squat, bench and deadlift heavier, the barbell is your best friend.',
      'Kettlebells, with their offset handle and ballistic nature, build explosive power, grip endurance and cardiovascular conditioning. They are unmatched for swings, cleans and snatches that light up the posterior chain.',
      'At Anchor Strength we do not make you choose. Our open gym gives you the free weights; our kettlebell group sessions give you the conditioning. Most members thrive on a mix of both.',
    ],
    date: '2025-02-01',
    author: 'Anchor Strength',
    tags: ['kettlebell', 'strength', 'training'],
  },
]

export const articleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug)
