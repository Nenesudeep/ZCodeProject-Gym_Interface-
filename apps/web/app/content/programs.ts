import type { Program } from '../types/content'

// All 12 disciplines from Anchor Strength's Instagram bio.
// isFlagship marks Calisthenics (their signature differentiator).
export const programs: Program[] = [
  {
    slug: 'calisthenics',
    title: 'Calisthenics',
    tagline: 'Master your bodyweight',
    icon: 'lucide:flexibility',
    description:
      "Boduppal's first dedicated calisthenics training — build raw strength, control and skill using just your bodyweight.",
    body: [
      'Calisthenics is the art of building extraordinary strength through bodyweight movement. At Anchor Strength, it is not a side offering — it is our foundation and the reason we exist.',
      'From your first pull-up to advanced skills like the muscle-up, front lever and human flag, our coaches progress you through a structured curriculum. No egos, no shortcuts — just intelligent, incremental mastery.',
      'Equipment includes pull-up bars, parallel bars, rings and resistance tools, but the real work happens between you and gravity.',
    ],
    isFlagship: true,
    keywords: ['calisthenics Hyderabad', 'calisthenics Boduppal', 'bodyweight training'],
  },
  {
    slug: 'gym',
    title: 'Open Gym & Strength',
    tagline: 'Free weights & machines',
    icon: 'lucide:dumbbell',
    description:
      'Full open-gym access with free weights, machines and functional equipment for strength and hypertrophy.',
    body: [
      'The open gym floor is open to all members during operating hours. Train at your own pace with quality free weights, machines and functional gear.',
      'Whether your goal is building muscle, getting stronger or general conditioning, you have everything you need — and a coach on hand if you want direction.',
    ],
    keywords: ['gym Boduppal', 'gym Hyderabad', 'strength training'],
  },
  {
    slug: 'personal-training',
    title: 'Personal Training',
    tagline: '1-on-1 coaching',
    icon: 'lucide:user-round',
    description:
      'One-on-one coaching tailored to your goals, schedule and current level — the fastest path to results.',
    body: [
      'Work directly with a coach who designs every session around you — your goals, your limitations, your timeline.',
      'Personal training is ideal for beginners who want confidence, athletes chasing a specific skill, and anyone who wants accountability.',
    ],
    keywords: ['personal trainer Hyderabad', 'PT Boduppal'],
  },
  {
    slug: 'kettlebell-group',
    title: 'Kettlebell Group Training',
    tagline: 'Conditioning & power',
    icon: 'lucide:flame',
    description:
      'High-energy group sessions using kettlebells for explosive power, conditioning and fat loss.',
    body: [
      'Kettlebell group training blends strength and conditioning into fast, addictive sessions. You will build a powerful posterior chain, grip and engine.',
      'Morning group slots run early — the perfect way to start the day with a community that pushes you.',
    ],
    keywords: ['kettlebell training Hyderabad', 'group fitness Boduppal'],
  },
  {
    slug: 'mma',
    title: 'MMA',
    tagline: 'Combat conditioning',
    icon: 'lucide:swords',
    description:
      'Mixed martial arts conditioning — technique, power and resilience for fighters and enthusiasts.',
    body: [
      'Our MMA programming builds the conditioning and fundamentals of mixed martial arts — striking, grappling and the fitness to sustain both.',
      'Suitable for anyone curious about combat sports, whether or not you ever plan to compete.',
    ],
    keywords: ['MMA Hyderabad', 'martial arts Boduppal'],
  },
  {
    slug: 'yoga',
    title: 'Yoga',
    tagline: 'Mobility & recovery',
    icon: 'lucide:flower-2',
    description:
      'Yoga sessions to improve mobility, breath control and recovery — the counterweight to hard training.',
    body: [
      'Yoga at Anchor Strength is built for lifters and athletes. Improve mobility, breath and recovery so your body handles hard training without breaking down.',
      'All levels welcome — our instructors meet you where you are.',
    ],
    keywords: ['yoga Hyderabad', 'yoga Boduppal'],
  },
  {
    slug: 'dance',
    title: 'Dance',
    tagline: 'Move & sweat',
    icon: 'lucide:music',
    description:
      'High-energy dance fitness that builds coordination, stamina and confidence — and never feels like a workout.',
    body: [
      'Dance fitness classes blend choreography with cardio for a session that feels like a party and still delivers results.',
      'A welcoming space for all skill levels.',
    ],
    keywords: ['dance fitness Hyderabad'],
  },
  {
    slug: 'animal-flow',
    title: 'Animal Flow',
    tagline: 'Ground-based movement',
    icon: 'lucide:paw-print',
    description:
      'Ground-based movement practice that builds fluid strength, mobility and body awareness.',
    body: [
      'Animal Flow is a bodyweight movement discipline using ground-based, animal-inspired flows. It develops mobility, stability and creative movement intelligence.',
      'Pairs perfectly with calisthenics and functional training.',
    ],
    keywords: ['animal flow Hyderabad'],
  },
  {
    slug: 'mudgars',
    title: 'Mudgars',
    tagline: 'Indian club training',
    icon: 'lucide:hammer',
    description:
      'Traditional Indian club training for shoulder health, grip and rotational power.',
    body: [
      'Mudgars — traditional Indian clubs — are one of the oldest strength tools in the world. They build healthy shoulders, a strong grip and rotational power that translates to every other discipline.',
      'A uniquely Indian training method, taught with respect for its roots.',
    ],
    keywords: ['mudgar training Hyderabad', 'Indian club training'],
  },
  {
    slug: 'steel-mace',
    title: 'Steel Mace',
    tagline: 'Asymmetric strength',
    icon: 'lucide:screwdriver',
    description:
      'Steel mace training for full-body strength, core stability and rotational power.',
    body: [
      'The steel mace’s offset weight challenges your core and stabilisers in ways no symmetric tool can. Expect serious grip, shoulder and core development.',
    ],
    keywords: ['steel mace training Hyderabad'],
  },
  {
    slug: 'arm-wrestling',
    title: 'Arm Wrestling',
    tagline: 'Grip & pulling power',
    icon: 'lucide:hand',
    description:
      'Arm wrestling training and technique — build specialised pulling and grip strength.',
    body: [
      'A niche but passionate program: develop the specialised grip, wrist and pulling strength that arm wrestling demands, plus the technique that wins matches.',
    ],
    keywords: ['arm wrestling Hyderabad'],
  },
  {
    slug: 'sport-events',
    title: 'Sport Events',
    tagline: 'Compete & test yourself',
    icon: 'lucide:trophy',
    description:
      'Regular competitions and events that let members test their progress and build community.',
    body: [
      'We run regular sport events and competitions so members have something to train towards — and a community to share the journey with.',
      'From internal challenges to open competitions, there is always a goal on the horizon.',
    ],
    keywords: ['fitness events Hyderabad'],
  },
]

export const programBySlug = (slug: string): Program | undefined =>
  programs.find((p) => p.slug === slug)
