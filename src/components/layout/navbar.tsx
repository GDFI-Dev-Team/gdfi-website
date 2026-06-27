'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, HandHeart, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/navigation'
import Button, { buttonBase } from '../ui/button'
import { ThemeToggle } from './theme-toggle'

const LOGO_MARK_SRC = '/logo-images/logo.svg'
const NAME_MARK_SRC = '/logo-images/name.svg'

function BrandLogo({
  priority = false,
  scrolled = false,
  atTop = false,
}: {
  priority?: boolean
  scrolled?: boolean
  atTop?: boolean
}) {
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
          scrolled ? 'h-8 md:h-9 lg:h-10' : 'h-10 md:h-11 lg:h-14',
        )}
      />
      <span
        aria-hidden="true"
        style={{
          maskImage: `url(${NAME_MARK_SRC})`,
          WebkitMaskImage: `url(${NAME_MARK_SRC})`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'left center',
          WebkitMaskPosition: 'left center',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
        }}
        className={cn(
          'block aspect-448/76 shrink-0 transition-all duration-500 ease-in-out',
          atTop ? 'bg-text-standard' : 'bg-foreground',
          scrolled ? 'h-6 md:h-6 lg:h-9' : 'h-7 md:h-7 lg:h-11',
        )}
      />
    </>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
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
      setAtTop(y <= 24)
      const prev = lastScrollY.current
      if (Math.abs(y - prev) < 6) return
      if (y <= 24) {
        setScrolled(false)
      } else if (y > prev) {
        setScrolled(true)
      } else {
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

  const isProgramPost =
    pathname.startsWith('/programs/') && !pathname.includes('/page/')
  const isAnnouncementPost =
    pathname.startsWith('/updates/announcements/') &&
    !pathname.includes('/page/')
  const forceSolidNav = isProgramPost || isAnnouncementPost
  const isTransparent = atTop && !forceSolidNav

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ease-in-out',
          isTransparent
            ? 'border-transparent bg-transparent'
            : 'border-foreground/10 bg-background',
        )}
      >
        <div
          className={cn(
            'px-4 transition-all duration-500 ease-in-out md:py-4 lg:px-8',
            scrolled ? 'py-3' : 'py-5',
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-2 md:gap-3">
            {/* Hamburger */}
            <Button
              variant="ghost"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className={cn(
                'shrink-0 overflow-hidden p-0 transition-all duration-500 ease-in-out md:hidden',
                isTransparent
                  ? 'text-text-standard hover:bg-text-standard/10'
                  : 'text-foreground hover:bg-foreground/5',
                scrolled ? 'max-w-0 opacity-0' : 'mr-1 max-w-10 opacity-100',
              )}
            >
              <Menu size={26} aria-hidden="true" />
            </Button>

            {/* Logo */}
            <Link
              href="/"
              aria-label="GDFI — home"
              className="flex shrink-0 items-center gap-2"
            >
              <BrandLogo priority scrolled={scrolled} atTop={isTransparent} />
            </Link>

            {/* Nav links — center, desktop only */}
            <nav className="hidden flex-1 items-center justify-center gap-0.5 md:flex lg:gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                const triggerClass = cn(
                  'whitespace-nowrap rounded-full px-2 py-2 text-xs font-semibold transition-colors lg:px-3.5 lg:text-sm',
                  active
                    ? isTransparent
                      ? 'bg-text-standard/15 text-text-standard'
                      : 'bg-primary/10 text-primary-hover'
                    : isTransparent
                      ? 'text-text-standard hover:bg-text-standard/10'
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
                      <div
                        className={cn(
                          'min-w-60 rounded-2xl border p-1.5 transition-colors duration-500 ease-in-out',
                          isTransparent
                            ? 'border-text-standard/40 bg-surface/60 shadow-lg backdrop-blur-md'
                            : 'border-foreground/10 bg-surface shadow-lg',
                        )}
                      >
                        {link.children.map((child) => {
                          const childActive = isActive(child.href)
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={childActive ? 'page' : undefined}
                              onClick={(e) => e.currentTarget.blur()}
                              className={cn(
                                'block whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                                childActive
                                  ? 'bg-primary/10 text-primary-hover'
                                  : isTransparent
                                    ? 'text-text-standard hover:bg-text-standard/10'
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
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <ThemeToggle
                className={cn(
                  'transition-colors duration-500 ease-in-out',
                  isTransparent
                    ? 'border-text-standard/40 text-text-standard hover:bg-text-standard/10'
                    : 'border-border',
                )}
              />

              {/* Support Us */}
              <Link
                href="/support-us"
                aria-label="Support Us"
                className={cn(
                  buttonBase,
                  'inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-500 ease-in-out active:scale-95',
                  isTransparent
                    ? 'border-text-standard/40 bg-transparent text-text-standard hover:bg-text-standard/10'
                    : 'border-transparent bg-btn-primary text-white shadow-sm hover:bg-btn-primary-hover',
                  scrolled ? 'md:px-5' : 'md:px-4',
                )}
              >
                <HandHeart size={20} aria-hidden="true" />
                <span
                  className={cn(
                    'hidden overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out lg:inline-block lg:align-middle',
                    scrolled
                      ? 'lg:ml-0 lg:max-w-0 lg:opacity-0'
                      : 'lg:ml-2 lg:max-w-28 lg:opacity-100',
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

              // Accordion item
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
