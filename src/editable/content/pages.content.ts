import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Business listings and local discovery',
      description:
        'Explore trusted business listings on a professional platform built for quick, informed discovery.',
      openGraphTitle: 'Business listings and local discovery',
      openGraphDescription:
        'Discover businesses, services, and useful details through a clean professional directory.',
      keywords: ['business listings', 'business directory', 'local services', 'company discovery', 'professional platform'],
    },
    hero: {
      badge: 'Professional business directory',
      title: ['Find the right business', 'for what you need.'],
      description:
        'Explore trusted business listings, services, and essential details through a clean directory built for faster decisions.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
      searchPlaceholder: 'Search businesses, services, and locations…',
      focusLabel: 'Discover',
      featureCardBadge: 'Listing highlights',
      featureCardTitle: 'Discover the latest businesses and services.',
      featureCardDescription:
        'Fresh listings are indexed daily so you can find current and relevant business information.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for business discovery and faster decisions.',
      paragraphs: [
        'This directory brings together trusted business listings so visitors can explore companies and services through one connected experience.',
        'Instead of scattering business information across disconnected sources, everything stays organized with consistent navigation and easy discovery.',
        'Whether you start with a business name, service, or search query, you can keep exploring relevant listings without losing context.',
      ],
      sideBadge: 'Platform highlights',
      sidePoints: [
        'Business-first homepage with strong emphasis on useful details.',
        'Connected sections for businesses, services, and locations.',
        'Clean browsing experience designed for focused discovery.',
        'Fast, lightweight interactions built for everyday professional use.',
      ],
      primaryLink: { label: 'Browse businesses', href: '/listing' },
      secondaryLink: { label: 'See listings', href: '/listings' },
    },
    cta: {
      badge: 'Get in touch',
      title: 'Explore businesses and services through one connected directory.',
      description:
        'Find trusted business listings and useful details through a professional platform designed for focused discovery.',
      primaryCta: { label: 'Get started for free', href: '/signup' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest business listings in this section.',
    },
  },
  about: {
    badge: 'Our platform',
    title: 'A professional home for insights, listings, and discovery.',
    description: `${slot4BrandConfig.siteName} is built to connect expert articles, business listings, and curated resources through a unified and readable experience.`,
    paragraphs: [
      'Instead of splitting content into disconnected pages, the platform keeps everything well-organized and easy to navigate so visitors can move naturally from one topic to another.',
      'Whether someone starts with an article, a business listing, or a search query, they can continue exploring without losing context or momentum.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description:
          'We prioritize clarity, structure, and pacing so professionals can read, browse, and discover without noise or distraction.',
      },
      {
        title: 'Connected content surfaces',
        description:
          'Articles, business listings, and curated resources stay connected so discovery feels natural across the entire platform.',
      },
      {
        title: 'Professional and trustworthy',
        description:
          'We focus on clean navigation and clear page structure so visitors can find relevant, accurate content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us how we can help you.',
    description:
      'Whether you want to publish content, list a business, or just get in touch — fill in the details below and we will get back to you promptly.',
    formTitle: 'Send us a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search articles, business listings, topics, and content across the platform.',
    },
    hero: {
      badge: 'Search the platform',
      title: 'Find articles, listings, and resources faster.',
      description:
        'Use keywords, categories, and content types to discover the most relevant posts from every section of the platform.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit a business listing.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Sign in to add your business.',
      description:
        'Use your account to open the business publishing workspace and create a detailed listing.',
    },
    hero: {
      badge: 'Business publishing workspace',
      title: 'Add your business to the directory.',
      description:
        'Add the essential details customers need to discover, understand, and contact your business.',
    },
    formTitle: 'Business details',
    submitLabel: 'Submit listing',
    successTitle: 'Business listing submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your account.',
      badge: 'Member access',
      title: 'Welcome back.',
      description:
        'Sign in to continue browsing, managing your submissions, and creating new content from your account.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount:
        'No account matched these details. Create an account first, then sign in.',
      success: 'Sign-in successful. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Platform access',
      title: 'Create your account and start publishing.',
      description:
        'Create an account to access the publishing workspace, save your details, and submit content to the platform.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Related profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
