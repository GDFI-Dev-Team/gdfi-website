'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { navLinks } from '../../lib/data'

const LOGO_SRC = '/logo-images/logo_with_name_white.svg'

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenSubmenu(null)
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        \
        <div
          className={cn(
            'mx-auto grid grid-cols-[0.7fr_auto_1.5fr] items-center gap-0 rounded-4xl transition-all duration-300 ease-out md:grid-cols-[auto_1fr_auto]',
            scrolled
              ? 'glass mt-3 w-[calc(100%_-_2rem)] max-w-3xl px-4 py-2.5 md:w-[calc(100%_-_8rem)] md:max-w-5xl md:px-6'
              : 'mt-0 w-full max-w-full border border-transparent bg-transparent px-5 py-4 md:px-[clamp(2rem,13vw,12.5rem)]',
          )}
        >
          {/* Hamburger — mobile only, left */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="col-start-1 inline-flex justify-self-start items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-foreground/5 md:hidden"
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

          {/* Logo — center on mobile, left on desktop */}
          <Link
            href="/"
            aria-label="GDFI — home"
            className="col-start-2 flex items-center justify-self-center md:col-start-1 md:justify-self-start"
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

          {/* Nav links — center, desktop only */}
          <nav className="col-start-2 hidden items-center justify-self-center md:flex md:gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const triggerClass = cn(
                'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                active
                  ? 'bg-primary/10 text-primary-hover'
                  : 'text-foreground hover:bg-foreground/5',
              )

              if (!link.children?.length) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={triggerClass}
                  >
                    {link.label}
                  </Link>
                )
              }

              return (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    aria-haspopup="menu"
                    className={cn(
                      triggerClass,
                      'inline-flex items-center gap-1',
                    )}
                  >
                    {link.label}
                    <ChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-10 pt-2 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="glass min-w-60 rounded-2xl border border-white/30 p-1.5">
                      {link.children.map((child) => {
                        const childActive = isActive(child.href)
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={childActive ? 'page' : undefined}
                            className={cn(
                              'block whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                              childActive
                                ? 'bg-white/15 text-white'
                                : 'text-white/90 hover:bg-white/10 hover:text-white',
                            )}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Donate — right */}
          <Link
            href="/donate"
            className={cn(
              'col-start-3 justify-self-end shrink-0 rounded-full bg-primary-400 font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-primary-500 active:scale-95',
              scrolled ? 'px-3.5 py-1.5 text-sm' : 'px-4 py-2 text-sm',
            )}
          >
            Donate
          </Link>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={closeMobile}
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
              onClick={closeMobile}
              className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
              const active = isActive(link.href)
              const rowClass = cn(
                'rounded-xl px-4 py-2 text-lg font-semibold transition-colors',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white hover:bg-white/10',
              )

              if (!link.children?.length) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className={rowClass}
                  >
                    {link.label}
                  </Link>
                )
              }

              // Accordion item — tap the row to expand its children inline.
              const open = openSubmenu === link.label
              return (
                <div key={link.href}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenSubmenu(open ? null : link.label)}
                    className={cn(
                      rowClass,
                      'flex w-full items-center justify-between',
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        'transition-transform duration-200',
                        open && 'rotate-180',
                      )}
                    />
                  </button>
                  {open && (
                    <div className="mt-0.5 flex flex-col gap-0.5 pl-4">
                      {link.children.map((child) => {
                        const childActive = isActive(child.href)
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMobile}
                            className={cn(
                              'rounded-xl px-4 py-2 text-base font-medium transition-colors',
                              childActive
                                ? 'bg-white/15 text-white'
                                : 'text-white/85 hover:bg-white/10 hover:text-white',
                            )}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

export default SiteHeader
