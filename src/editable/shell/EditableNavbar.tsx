'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'article').map((task) => ({ label: task.label, href: task.route })),
    []
  )

  const extraLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const allLinks = [...navItems.slice(0, 4), ...extraLinks]

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] shadow-[0_1px_0_var(--editable-border)]">
      <nav className="mx-auto flex h-[72px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 mr-4"
          aria-label={SITE_CONFIG.name}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
            <img
              src="/favicon.png?v=20260729"
              alt={SITE_CONFIG.name}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden font-display text-[1.1rem] font-bold leading-none tracking-tight text-[var(--slot4-page-text)] sm:block">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden flex-1 items-center gap-0.5 lg:flex">
          {allLinks.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'text-[var(--slot4-accent)]'
                    : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-accent)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right-side actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {/* Search toggle */}
          <button
            type="button"
            onClick={() => { setSearchOpen((v) => !v); setMobileOpen(false) }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]"
            aria-label="Search"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {session ? (
            <>
              <span className="hidden max-w-[120px] truncate text-sm font-medium text-[var(--slot4-page-text)] sm:block">
                {session.name}
              </span>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full border border-[var(--slot4-accent)] px-4 py-2 text-sm font-semibold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-white sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" />
                Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:block"
              >
                Get started
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => { setMobileOpen((v) => !v); setSearchOpen(false) }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-panel-bg)] lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4">
          <form
            action="/search"
            className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-5 py-3 focus-within:border-[var(--slot4-accent)] focus-within:bg-white transition"
          >
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder={globalContent.nav.actions.primary.label.includes('Search') ? globalContent.nav.actions.primary.label : 'Search articles, listings, and more…'}
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              autoFocus
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[var(--slot4-dark-bg)] px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-5 lg:hidden">
          <div className="grid gap-0.5">
            {[{ label: 'Home', href: '/' }, ...allLinks].map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="mt-4 grid gap-2 border-t border-[var(--editable-border)] pt-4">
            {session ? (
              <>
                <p className="px-4 text-xs font-medium text-[var(--slot4-muted-text)]">Signed in as {session.name}</p>
                <Link
                  href="/create"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-[var(--slot4-accent)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-white"
                >
                  Create post
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setMobileOpen(false) }}
                  className="rounded-full bg-[var(--slot4-dark-bg)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-[var(--editable-border)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[var(--slot4-dark-bg)] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
