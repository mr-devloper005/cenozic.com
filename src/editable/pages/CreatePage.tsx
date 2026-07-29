'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Globe2, ImageIcon, Lock, MapPin, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded-xl border border-[var(--editable-border)] bg-white px-4 py-3.5 text-sm font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-muted-text)]/60 focus:border-[var(--slot4-accent)] focus:ring-4 focus:ring-[var(--slot4-accent)]/10'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((item) => item.enabled && item.key === 'listing'), [])
  const [task] = useState<TaskKey>('listing')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--editable-page-bg,#fff7ee)] px-4 py-16 text-[var(--editable-page-text,#2f1d16)] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-[2.8rem] border border-[var(--editable-border)] bg-white/75 p-7 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center rounded-[2rem] bg-[var(--editable-page-text,#2f1d16)] text-[var(--editable-page-bg,#fff7ee)]">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] opacity-55">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-page-text,#2f1d16)] px-6 py-3 text-sm font-black text-[var(--editable-page-bg,#fff7ee)]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--editable-page-bg,#fff7ee)] text-[var(--editable-page-text,#2f1d16)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-white shadow-[0_24px_70px_rgba(13,50,66,0.10)]">
            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="relative overflow-hidden bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-10 lg:p-12">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/15 blur-3xl" />
              <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
              <h1 className="editable-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/65">{pagesContent.create.hero.description}</p>
              <div className="mt-10 space-y-3">
                {[
                  [Building2, 'Business identity', 'Add the name, category, and description.'],
                  [MapPin, 'Location details', 'Help customers find the business quickly.'],
                  [Globe2, 'Contact information', 'Share the website and useful business links.'],
                  [ImageIcon, 'Business image', 'Add a clear logo or featured image.'],
                ].map(([Icon, title, description]) => (
                  <div key={String(title)} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent)]/15 text-[var(--slot4-accent)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{String(title)}</p>
                      <p className="mt-1 text-xs leading-5 text-white/55">{String(description)}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </aside>

            <form onSubmit={submit} className="bg-[var(--slot4-page-bg)] p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Create {activeTask?.label || 'business listing'}</p>
                  <h2 className="editable-display mt-2 text-3xl font-bold tracking-tight">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-xs font-semibold">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Business name" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short business summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Business description, services, hours, address, and contact details" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--slot4-accent)]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
