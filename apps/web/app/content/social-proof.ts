import type { Testimonial, Trainer, Faq, GalleryItem } from '../types/content'

// Testimonials adapted from public Justdial/Tripadvisor reputation
// (5.0 rating, ~131 reviews). Names anonymised as placeholders pending
// written consent to use real names.
export const testimonials: Testimonial[] = [
  {
    name: 'Ravi K.',
    quote:
      "Easily the best gym in Boduppal. The coaches actually care — I went from zero pull-ups to my first muscle-up in five months.",
    rating: 5,
    source: 'Justdial',
    context: 'Member since 2023',
  },
  {
    name: 'Sneha P.',
    quote:
      "I was nervous joining a gym but the team made it welcoming. The kettlebell group sessions are addictive and I never thought I'd enjoy training this much.",
    rating: 5,
    source: 'Justdial',
    context: 'Calisthenics member',
  },
  {
    name: 'Arjun M.',
    quote:
      'Where else in east Hyderabad do you get calisthenics, MMA and mace training under one roof? The variety keeps me coming back.',
    rating: 5,
    source: 'Tripadvisor',
  },
  {
    name: 'Divya R.',
    quote:
      'Supportive trainers, clean facility, great energy. The hours are perfect — I train before work at 6 AM and the place is alive.',
    rating: 5,
    source: 'Justdial',
  },
]

// Placeholder trainers — owner fills real bios in the CMS.
export const trainers: Trainer[] = [
  {
    name: 'Coach (placeholder)',
    specialty: 'Head Calisthenics Coach',
    bio: 'Lead coach overseeing the calisthenics curriculum and athlete development.',
    certifications: ['Calisthenics Level 2', 'Functional Training Certified'],
  },
  {
    name: 'Coach (placeholder)',
    specialty: 'Kettlebell & Conditioning',
    bio: 'Runs the morning kettlebell group sessions and conditioning programming.',
    certifications: ['Hardstyle Kettlebell Certified'],
  },
  {
    name: 'Coach (placeholder)',
    specialty: 'MMA & Combat',
    bio: 'Coaches the MMA program with a focus on fundamentals and conditioning.',
    certifications: ['Combat Sports Coaching'],
  },
]

export const faqs: Faq[] = [
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes. Your first session is on us so you can experience the coaching and the space before committing. Reach out via the contact form or WhatsApp to book it.',
  },
  {
    question: 'I am a complete beginner. Is that okay?',
    answer:
      'Absolutely. A huge part of our membership started with no training background. Our coaches scale every session to your level — you will never be asked to do something you are not ready for.',
  },
  {
    question: 'What are your timings?',
    answer:
      'We are open from 5:00 AM to 10:00 PM, Monday to Saturday, and until 9:00 PM on Sundays. We are open 365 days a year.',
  },
  {
    question: 'Do you have women-only options?',
    answer:
      'Yes — we offer dedicated batches and a welcoming environment for women. Contact us for current timings and we will find a slot that works for you.',
  },
  {
    question: 'Where exactly are you located?',
    answer:
      '2nd Floor, Achaiah Complex, Boduppal Road, above SBI Bank, Mallikarjuna Nagar, Hyderabad — 500092. Near the Uppal International Cricket Stadium.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer:
      'Cash, UPI and cards. Online membership purchase is coming soon.',
  },
]

export const galleryItems: GalleryItem[] = [
  {
    type: 'photo',
    title: 'Calisthenics rig',
    caption: 'Pull-up bars, rings and parallel bars — the heart of the floor.',
    gradient: 'from-brand-700 to-ink-900',
  },
  {
    type: 'reel',
    title: 'First muscle-up',
    caption: 'Member hitting their first muscle-up after months of work.',
    gradient: 'from-accent-500 to-brand-800',
  },
  {
    type: 'photo',
    title: 'Kettlebell group',
    caption: '6:30 AM group session. The energy is real.',
    gradient: 'from-ink-700 to-brand-900',
  },
  {
    type: 'photo',
    title: 'Free weights',
    caption: 'Full open-gym access with quality equipment.',
    gradient: 'from-brand-800 to-ink-800',
  },
  {
    type: 'reel',
    title: 'Steel mace flow',
    caption: 'Rotational power and core stability in action.',
    gradient: 'from-accent-700 to-ink-900',
  },
  {
    type: 'photo',
    title: 'Community',
    caption: 'Join a team, not just a gym.',
    gradient: 'from-brand-600 to-accent-600',
  },
]
