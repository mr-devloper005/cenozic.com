import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Insights, listings, and discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Insights and discovery platform',
    primaryLinks: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Search articles, listings, and more…', href: '/search' },
      secondary: { label: 'Get started', href: '/signup' },
    },
  },
  footer: {
    tagline: 'The platform for insights, discovery, and businesses',
    description:
      'A professional platform connecting expert articles, business listings, and curated content — built for people who want to stay informed and discover what matters.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/articles' },
          { label: 'Listings', href: '/listings' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About us', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Professional content and business discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
