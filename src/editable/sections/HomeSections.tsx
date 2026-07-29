import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, BookOpen, Building2, ChevronRight,
  FileText, Globe, Image as ImageIcon, MapPin, Megaphone, Search,
  TrendingUp, UserRound, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

// --------------------------------------------------------------------------
// Utility helpers
// --------------------------------------------------------------------------

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function hashStr(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const p of posts) {
    const k = p.slug || p.id || p.title
    if (!k || seen.has(k)) continue
    seen.add(k)
    out.push(p)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of posts) {
    const img = getEditablePostImage(p)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

// --------------------------------------------------------------------------
// Hero section — full-bleed collage with gradient overlay + announcement bar
// --------------------------------------------------------------------------

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover what matters on ${SITE_CONFIG.name}`

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden sm:h-[560px] lg:h-[620px]">
        {/* Background collage */}
        <EditableHeroCollage images={heroImages} />

        {/* Dark overlays — heavier on left, lighter on right (HERE style) */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(13,50,66,0.92)_0%,rgba(13,50,66,0.70)_45%,rgba(13,50,66,0.30)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(13,50,66,0.55))]" />

        {/* Content */}
        <div className={`relative flex h-full flex-col justify-center ${container}`}>
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
              {pagesContent.home.hero.badge}
            </p>

            <h1 className="editable-display text-balance text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.4rem]">
              {heroTitle}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              {pagesContent.home.hero.description}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={primaryRoute}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[var(--slot4-dark-bg)]"
              >
                {pagesContent.home.hero.primaryCta?.label || 'Browse listings'}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {pagesContent.home.hero.secondaryCta?.label || 'Contact us'}
              </Link>
            </div>

            {/* Search bar */}
            <form action="/search" className="mt-8 flex w-full max-w-lg overflow-hidden rounded-full bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.30)] backdrop-blur-sm">
              <div className="flex flex-1 items-center gap-2.5 px-5">
                <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
                <input
                  name="q"
                  placeholder={pagesContent.home.hero.searchPlaceholder || 'Search businesses, services, and locations…'}
                  className="w-full bg-transparent py-3.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--slot4-dark-bg)] px-5 text-sm font-semibold text-white transition hover:opacity-90 sm:px-7"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Bottom credit */}
        {heroImages.length > 0 ? (
          <p className="absolute bottom-4 right-4 text-xs font-medium text-white/50">
            {SITE_CONFIG.name} — live listings
          </p>
        ) : null}
      </section>

      {/* Trust strip */}
      <div className="border-b border-[var(--editable-border)] bg-white">
        <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 ${container}`}>
          {[
            { icon: <BookOpen className="h-4 w-4 text-[var(--slot4-accent)]" />, label: 'Detailed listings' },
            { icon: <Building2 className="h-4 w-4 text-[var(--slot4-accent)]" />, label: 'Business directory' },
            { icon: <TrendingUp className="h-4 w-4 text-[var(--slot4-accent)]" />, label: 'Updated daily' },
            { icon: <Globe className="h-4 w-4 text-[var(--slot4-accent)]" />, label: 'Open access' },
          ].map(({ icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-muted-text)]">
              {icon} {label}
            </span>
          ))}
          <Link
            href={primaryRoute}
            className="ml-auto hidden items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline sm:inline-flex"
          >
            Browse all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------
// Featured content announcement — dark teal card (HERE's "news card" section)
// --------------------------------------------------------------------------

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const featured = pool.slice(0, 1)[0]
  const secondary = pool.slice(1, 3)

  return (
    <section className="bg-[var(--slot4-dark-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr_1fr]">

          {/* Main featured card */}
          {featured ? (
            <div className="relative overflow-hidden rounded-2xl bg-[var(--slot4-dark-bg)] p-8 ring-1 ring-white/10 here-card-dark transition lg:p-10">
              <div className="absolute inset-0 opacity-20">
                {getEditablePostImage(featured) && (
                  <img
                    src={getEditablePostImage(featured)}
                    alt=""
                    className="h-full w-full object-cover"
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--slot4-dark-bg)] via-[var(--slot4-dark-bg)]/80 to-transparent" />
              </div>
              <div className="relative">
                <span className="inline-block rounded-full bg-[var(--slot4-accent)]/20 px-3 py-1 text-xs font-semibold text-[var(--slot4-accent)]">
                  {categoryOf(featured) || 'Featured'}
                </span>
                <h2 className="editable-display mt-4 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-base leading-7 text-white/65">
                  {getExcerpt(featured, 160)}
                </p>
                <Link
                  href={postHref(primaryTask, featured, primaryRoute)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 lg:p-10">
              <p className="text-white/40 text-sm">Featured listings will appear here once businesses are published.</p>
            </div>
          )}

          {/* Secondary cards */}
          {secondary.map((post, idx) => (
            <Link
              key={post.id || post.slug}
              href={postHref(primaryTask, post, primaryRoute)}
              className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition here-card-dark"
            >
              <div className="absolute inset-0 bg-[var(--slot4-dark-bg)]">
                {getEditablePostImage(post) && (
                  <img
                    src={getEditablePostImage(post)}
                    alt=""
                    className="h-full w-full object-cover opacity-30 transition duration-700 group-hover:opacity-40 group-hover:scale-[1.03]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--slot4-dark-bg)] via-[var(--slot4-dark-bg)]/60 to-transparent" />
              </div>
              <div className="relative flex h-full min-h-[200px] flex-col justify-end p-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
                  {categoryOf(post) || 'Business'}
                </span>
                <h3 className="editable-display mt-2 text-lg font-bold leading-snug text-white">
                  {post.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--slot4-accent)]">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}

          {!secondary.length ? (
            <>
              {[0, 1].map((i) => (
                <div key={i} className="min-h-[200px] rounded-2xl bg-white/5 ring-1 ring-white/10" />
              ))}
            </>
          ) : null}
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/5 ring-1 ring-white/10">
          {[
            { num: `${Math.max(posts.length, 100)}+`, label: 'Businesses listed' },
            { num: `${Math.max(SITE_CONFIG.tasks.filter((t) => t.enabled).length, 2)}`, label: 'Business categories' },
            { num: 'Daily', label: 'Fresh updates' },
          ].map(({ num, label }) => (
            <div key={label} className="px-6 py-7 text-center here-stat-num">
              <p className="editable-display text-3xl font-bold text-[var(--slot4-accent)] sm:text-4xl">
                {num}
              </p>
              <p className="mt-1.5 text-sm font-medium text-white/55">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --------------------------------------------------------------------------
// Editorial grid — "From insights to action" (3-col cards, image-first)
// --------------------------------------------------------------------------

function EditorialCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl bg-[var(--slot4-dark-bg)] ring-1 ring-white/5 transition here-card-dark"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={post.title}
            className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-90"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[var(--slot4-dark-bg)] to-[var(--slot4-accent)]/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--slot4-dark-bg)] via-[var(--slot4-dark-bg)]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {category ? (
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
            {category}
          </span>
        ) : null}
        <h3 className="editable-display mt-2 line-clamp-2 text-xl font-bold leading-snug tracking-tight text-white">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-white/60">
          {getExcerpt(post, 110)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
          View listing <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)]).slice(0, 9)

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        {/* Section header */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">
              Latest listings
            </p>
            <h2 className="editable-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-[var(--slot4-page-text)]">
              From insights to action
            </h2>
            <p className="mt-3 max-w-xl text-[var(--slot4-muted-text)]">
              The newest businesses and services added across {SITE_CONFIG.name}.
            </p>
          </div>
          <Link
            href={primaryRoute}
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {pool.length ? (
          <>
            {/* Featured top row: 1 large + 2 stacked */}
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_0.85fr_0.85fr]">
              {pool.slice(0, 3).map((post) => (
                <EditorialCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ))}
            </div>

            {/* Secondary grid */}
            {pool.length > 3 ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pool.slice(3, 9).map((post) => (
                  <EditorialCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            ) : null}

            <div className="mt-10 text-center">
              <Link
                href={primaryRoute}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] shadow-sm"
              >
                Show all listings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-[var(--editable-border)] py-20 text-center">
            <p className="text-[var(--slot4-muted-text)]">Listings will appear here once businesses are published.</p>
          </div>
        )}
      </div>
    </section>
  )
}

// --------------------------------------------------------------------------
// Time-based discovery — "Advanced capabilities for your needs" style sections
// --------------------------------------------------------------------------

function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(13,50,66,0.12)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
        {image ? (
          <img
            src={image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : null}
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)] shadow-sm">
            {category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="editable-display line-clamp-2 text-base font-bold leading-snug tracking-tight text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">
          {getExcerpt(post, 100)}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--slot4-accent)]">
          View listing <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string; description: string }> = {
  spotlight: {
    eyebrow: 'This week',
    title: 'Fresh perspectives, just published',
    description: 'The newest business listings added in the last 7 days.',
  },
  browse: {
    eyebrow: 'Trending now',
    title: 'Most-read this month',
    description: 'Businesses getting the most attention from visitors right now.',
  },
  index: {
    eyebrow: 'Evergreen',
    title: 'Established businesses to explore',
    description: 'Useful business listings worth revisiting.',
  },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((s) => s.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, i) => {
        const copy = sectionCopy[section.key] || {
          eyebrow: 'Discover',
          title: 'More to explore',
          description: 'Keep discovering businesses across the directory.',
        }

        return (
          <section
            key={section.key}
            className={i % 2 === 0 ? 'bg-[var(--slot4-panel-bg)]' : 'bg-white'}
          >
            <div className={`py-14 sm:py-16 ${container}`}>
              {/* Header */}
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">
                    {copy.eyebrow}
                  </p>
                  <h2 className="editable-display mt-2 text-2xl font-bold tracking-tight text-[var(--slot4-page-text)] sm:text-3xl">
                    {copy.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{copy.description}</p>
                </div>
                <Link
                  href={section.href || primaryRoute}
                  className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline sm:inline-flex"
                >
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Cards */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(primaryTask, post, primaryRoute)}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

// --------------------------------------------------------------------------
// CTA band — "Get in touch" (HERE-style light-teal section)
// --------------------------------------------------------------------------

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-accent-soft)] border-t border-[var(--slot4-accent)]/15">
      <div className={`flex flex-col items-center gap-6 py-20 text-center sm:py-24 ${container}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">
          {pagesContent.home.cta.badge}
        </p>
        <h2 className="editable-display max-w-2xl text-3xl font-bold tracking-tight text-[var(--slot4-dark-bg)] sm:text-4xl">
          {pagesContent.home.cta.title}
        </h2>
        <p className="max-w-xl text-base leading-7 text-[var(--slot4-muted-text)] sm:text-lg">
          {pagesContent.home.cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-dark-bg)] transition hover:bg-[var(--slot4-dark-bg)] hover:text-white"
          >
            {pagesContent.home.cta.primaryCta?.label || 'Get started for free'}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {pagesContent.home.cta.secondaryCta?.label || 'Contact us'}
          </Link>
        </div>
      </div>
    </section>
  )
}
