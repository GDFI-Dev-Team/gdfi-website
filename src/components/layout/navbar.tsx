'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, HandHeart, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { navLinks } from '../../lib/navigation'
import Button, { buttonBase, buttonVariants } from '../ui/button'
import Text from '../ui/text'
import { ThemeToggle } from './theme-toggle'

const LOGO_MARK_SRC = '/logo-images/logo.svg'

function BrandLogo({
  priority = false,
  scrolled = false,
}: {
  priority?: boolean
  scrolled?: boolean
}) {
  // Two-line wordmark — font size shrinks when scrolled down, grows back up.
  // First value = mobile, md: value = desktop (desktop stays pinned).
  const wordmarkLine = cn(
    'whitespace-nowrap font-semibold text-foreground transition-all duration-500 ease-in-out',
    scrolled ? 'text-xs md:text-sm' : 'text-xs md:text-base',
  )
  return (
    <>
      <Image
        src={LOGO_MARK_SRC}
        alt=""
        width={1630}
        height={1421}
        priority={priority}
        className={cn(
          'w-auto shrink-0 transition-all duration-500 ease-in-out',
          // First value = mobile, md: value = desktop (desktop stays pinned).
          scrolled ? 'h-8 md:h-10' : 'h-10 md:h-14',
        )}
      />
      <span className="flex flex-col leading-tight">
        <Text className={wordmarkLine}>Guiuan Development</Text>
        <Text className={wordmarkLine}>Foundation, Incorporated</Text>
      </span>
    </>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const menuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setOpenSubmenu(null)
  }, [])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const prev = lastScrollY.current
      // Ignore tiny movements to avoid flicker.
      if (Math.abs(y - prev) < 6) return
      if (y <= 24) {
        // Always show the full bar near the top.
        setScrolled(false)
      } else if (y > prev) {
        // Scrolling down → compact.
        setScrolled(true)
      } else {
        // Scrolling up → restore immediately.
        setScrolled(false)
      }
      lastScrollY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mdBreakpoint = getComputedStyle(document.documentElement)
      .getPropertyValue('--breakpoint-md')
      .trim()
    const mq = window.matchMedia(`(min-width: ${mdBreakpoint})`)
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) closeMobile()
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [closeMobile])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    const el = menuRef.current
    if (!el) return
    if (mobileOpen) {
      el.removeAttribute('inert')
    } else {
      el.setAttribute('inert', '')
    }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background">
        <div
          className={cn(
            'px-(--gutter) transition-all duration-500 ease-in-out md:py-4',
            // Mobile vertical padding: taller when scrolled up, shorter when down.
            scrolled ? 'py-3' : 'py-5',
          )}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-[auto_auto_1fr] items-center gap-0 md:grid-cols-[auto_1fr_auto]">
            {/* Hamburger — mobile only, left. Collapses away on scroll. */}
            <Button
              variant="ghost"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className={cn(
                'justify-self-start overflow-hidden p-0 text-foreground transition-all duration-500 ease-in-out hover:bg-foreground/5 md:hidden',
                scrolled ? 'max-w-0 opacity-0' : 'mr-2 max-w-10 opacity-100',
              )}
            >
              <Menu size={26} aria-hidden="true" />
            </Button>

            {/* Logo — center on mobile, left on desktop */}
            <Link
              href="/"
              aria-label="GDFI — home"
              className="col-start-2 flex items-center gap-2 justify-self-start md:col-start-1 md:justify-self-start"
            >
              <BrandLogo priority scrolled={scrolled} />
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
                      <ChevronDown size={16} />
                    </Link>
                    <div className="invisible absolute left-0 top-full z-10 pt-2 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="min-w-60 rounded-2xl border border-foreground/10 bg-surface p-1.5 shadow-lg">
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
                                  ? 'bg-primary/10 text-primary-hover'
                                  : 'text-foreground hover:bg-foreground/5',
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

            {/* Right cluster — theme toggle + Support Us */}
            <div className="col-start-3 flex items-center gap-2 justify-self-end">
              <ThemeToggle />

              {/* Support Us. Icon-only on mobile; on desktop shows the label
                  until scrolled, then collapses to an icon-only pill. */}
              <Link
                href="/support-us"
                aria-label="Support Us"
                className={cn(
                  buttonBase,
                  buttonVariants.primary,
                  'inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-500 ease-in-out',
                  scrolled ? 'md:px-5' : 'md:px-4',
                )}
              >
                <HandHeart size={20} aria-hidden="true" />
                <span
                  className={cn(
                    'hidden overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out md:inline-block md:align-middle',
                    scrolled
                      ? 'md:ml-0 md:max-w-0 md:opacity-0'
                      : 'md:ml-2 md:max-w-28 md:opacity-100',
                  )}
                >
                  Support Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={closeMobile}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-50 bg-ink-strong/40',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Bottom-sheet menu */}
      <div
        ref={menuRef}
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-hidden={!mobileOpen}
        aria-label="Site menu"
        className={cn(
          'fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 rounded-2xl border border-foreground/10 bg-surface p-6 shadow-xl',
          mobileOpen ? 'block' : 'pointer-events-none hidden',
        )}
      >
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="GDFI — home"
              onClick={closeMobile}
              className="flex items-center gap-2"
            >
              <BrandLogo />
            </Link>
            <Button
              variant="ghost"
              aria-label="Close menu"
              onClick={closeMobile}
              className="shrink-0 rounded-full p-2 text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            >
              <X size={24} aria-hidden="true" />
            </Button>
          </div>

          <nav className="mt-6 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const rowClass = cn(
                'rounded-xl px-4 py-2 text-lg font-semibold transition-colors',
                active
                  ? 'bg-primary/10 text-primary-hover'
                  : 'text-foreground hover:bg-foreground/5',
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
              const open = openSubmenu === link.href
              return (
                <div key={link.href}>
                  <Button
                    variant="ghost"
                    aria-expanded={open}
                    onClick={() => setOpenSubmenu(open ? null : link.href)}
                    className={cn(
                      rowClass,
                      'flex w-full items-center justify-between',
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={20}
                      className={cn(open && 'rotate-180')}
                    />
                  </Button>
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
                                ? 'bg-primary/10 text-primary-hover'
                                : 'text-foreground hover:bg-foreground/5',
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
