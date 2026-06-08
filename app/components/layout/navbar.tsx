'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/data'

const LOGO_SRC = '/logo-images/logo_with_name.svg'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* Fixed header. The bar inside floats and turns into a rounded
          liquid-glass pill once scrolled — transparent at the top. */}
      <header className="fixed inset-x-0 top-0 z-50">
        {/* grid-cols-[ menu _ logo _ donate ] — tune the LEFT and RIGHT
            values to reposition the centered logo. Smaller left / bigger
            right pushes the logo leftward; values can be fr, rem, or px. */}
        <div
          className={cn(
            'mx-auto grid grid-cols-[0.7fr_auto_1.5fr] items-center gap-0 rounded-4xl transition-all duration-300 ease-out',
            scrolled
              ? 'glass mt-3 w-[calc(100%_-_2rem)] max-w-3xl px-4 py-2.5'
              : 'mt-0 w-full max-w-full border border-transparent bg-transparent px-5 py-4',
          )}
        >
          {/* Menu — left */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="inline-flex justify-self-start items-center justify-center rounded-lg p-2 text-ink-strong transition-colors hover:bg-ink-strong/5"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          {/* Logo — center */}
          <Link
            href="/"
            aria-label="GDFI — home"
            className="flex justify-self-center items-center"
          >
            <Image
              src={LOGO_SRC}
              alt="Guiuan Development Foundation Inc."
              width={414}
              height={62}
              priority
              className={cn(
                'w-auto transition-all duration-300 ease-out',
                scrolled ? 'h-6' : 'h-7',
              )}
            />
          </Link>

          {/* Donate — right */}
          <Link
            href="/donate"
            className={cn(
              'justify-self-end shrink-0 rounded-full bg-primary-400 font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-primary-500 active:scale-95',
              scrolled ? 'px-3.5 py-1.5 text-sm' : 'px-4 py-2 text-sm',
            )}
          >
            Donate
          </Link>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-50 bg-ink-strong/30 backdrop-blur-sm transition-opacity duration-300',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Bottom-sheet menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          // Floating sheet: inset from all screen edges (the `inset-x-3` and
          // `bottom-…` are the gaps; the bottom one also clears the safe area).
          'glass fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 rounded-2xl border border-white/30',
          'p-6',
          'transition-transform duration-300 ease-out',
          mobileOpen
            ? 'translate-y-0'
            : 'pointer-events-none translate-y-[150%]',
        )}
      >
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center justify-between gap-4">
            <Image
              src={LOGO_SRC}
              alt="Guiuan Development Foundation Inc."
              width={414}
              height={62}
              className="h-7 w-auto"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-ink-muted transition-colors hover:bg-ink-strong/5 hover:text-ink-strong"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-2 text-lg font-semibold transition-colors',
                    active
                      ? 'bg-primary/10 text-primary-hover'
                      : 'text-ink-strong hover:bg-ink-strong/5',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

export default SiteHeader
