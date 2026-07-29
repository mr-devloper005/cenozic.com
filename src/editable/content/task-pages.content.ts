import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Insights & Articles',
    headline: 'Expert articles, guides, and in-depth perspectives.',
    description:
      'Explore long-form articles, industry guides, and expert perspectives across a wide range of professional topics.',
    filterLabel: 'Filter by topic',
    secondaryNote: 'Quality content published by knowledgeable contributors.',
    chips: ['Industry insights', 'Expert guides', 'In-depth reads'],
  },
  classified: {
    eyebrow: 'Classifieds',
    headline: 'Fresh offers and time-sensitive listings.',
    description:
      'Browse current classifieds, job postings, and time-sensitive offers updated daily.',
    filterLabel: 'Filter category',
    secondaryNote: 'Actionable posts designed for quick discovery.',
    chips: ['Daily updates', 'Actionable offers', 'Direct contact'],
  },
  sbm: {
    eyebrow: 'Curated resources',
    headline: 'Bookmarked tools, references, and resources worth saving.',
    description:
      'A curated collection of links, tools, and resources selected for professional discovery and reference.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Organized resources for productive browsing.',
    chips: ['Curated links', 'Tools', 'Reference library'],
  },
  profile: {
    eyebrow: 'People & Organizations',
    headline: 'Profiles built for discovery and professional trust.',
    description:
      'Explore profiles of professionals, organizations, and businesses with clear identity and credibility cues.',
    filterLabel: 'Filter profile type',
    secondaryNote: 'Discover who is behind the content you trust.',
    chips: ['Professional profiles', 'Organizations', 'Verified listings'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'White papers, guides, and downloadable resources.',
    description:
      'Access downloadable guides, white papers, reports, and reference documents from industry contributors.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Professionally structured documents for informed decisions.',
    chips: ['White papers', 'Reports', 'Downloadable guides'],
  },
  listing: {
    eyebrow: 'Business directory',
    headline: 'Business listings built for discovery and comparison.',
    description:
      'Find and compare businesses, service providers, and organizations across a structured professional directory.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Detailed listings with contact information and key facts.',
    chips: ['Business directory', 'Compare providers', 'Contact directly'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Visual content with a gallery-first experience.',
    description:
      'Explore image posts, visual stories, and galleries presented in a clean portfolio-inspired layout.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Strong imagery with clear context and attribution.',
    chips: ['Visual stories', 'Gallery layouts', 'Portfolio browsing'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
