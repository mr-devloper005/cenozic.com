'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const ExternalIcon = () => (
  <svg className="inline-block h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 16 16" aria-hidden="true">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L7 10" />
  </svg>
)

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'article')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer
      className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]"
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label={SITE_CONFIG.name}>
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-white">
                <img
                  src="/favicon.png?v=20260729"
                  alt={SITE_CONFIG.name}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { label: 'X (Twitter)', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.847L1.999 2.25H8.07l4.258 5.635 5.917-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />, href: '#' },
                { label: 'LinkedIn', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" />, href: '#' },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/30 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">{icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {taskLinks.map((task) => (
                <li key={task.key}>
                  <Link
                    href={task.route}
                    className="text-sm font-medium text-white/70 transition hover:text-white"
                  >
                    {task.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-sm font-medium text-white/70 transition hover:text-white">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'About us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-medium text-white/70 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
              Account
            </h3>
            <ul className="mt-5 space-y-3">
              {session ? (
                <>
                  <li>
                    <Link href="/create" className="text-sm font-medium text-white/70 transition hover:text-white">
                      Create post
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={logout}
                      className="text-sm font-medium text-white/70 transition hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="text-sm font-medium text-white/70 transition hover:text-white">
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="text-sm font-medium text-white/70 transition hover:text-white">
                      Create account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-white/45">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              { label: 'Privacy', href: '/contact' },
              { label: 'Terms', href: '/contact' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs font-medium text-white/45 transition hover:text-white/80"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
