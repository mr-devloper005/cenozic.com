import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  HERE-inspired task surfaces.

  Every task (archive + detail) shares one cohesive premium identity:
  clean white surfaces, deep teal header, bright teal accent, and a
  professional sans-serif — matching the HERE Technologies design language.
  Per-task copy (kicker / note) still varies so each section keeps a voice.
  Tokens are delivered via CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Plus Jakarta Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
const BODY_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#f5faf9',
  surface: '#ffffff',
  raised: '#f0f9f8',
  text: '#0d2535',
  muted: '#4a6875',
  line: '#cbe3df',
  accent: '#00bfa8',
  accentSoft: '#e4f7f5',
  onAccent: '#ffffff',
  glow: 'rgba(0,191,168,0.10)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: {
    ...base,
    kicker: 'Insights & Articles',
    note: 'In-depth reads, industry guides, and expert perspectives worth your time.',
  },
  listing: {
    ...base,
    kicker: 'Business Directory',
    note: 'Find, compare, and connect with businesses and service providers.',
  },
  classified: {
    ...base,
    kicker: 'Marketplace',
    note: 'Fresh offers and listings posted daily — ready to act on.',
  },
  image: {
    ...base,
    kicker: 'Visual Gallery',
    note: 'A curated visual feed of standout images and creative work.',
  },
  sbm: {
    ...base,
    kicker: 'Resource Library',
    note: 'Curated bookmarks, tools, and references worth saving.',
  },
  pdf: {
    ...base,
    kicker: 'Document Library',
    note: 'Downloadable guides, white papers, and reference materials.',
  },
  profile: {
    ...base,
    kicker: 'People & Profiles',
    note: 'Discover professionals, creators, and organizations.',
  },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
