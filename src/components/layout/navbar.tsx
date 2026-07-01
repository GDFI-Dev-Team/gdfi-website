'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, HandHeart, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'
import { navLinks } from '@/lib/navigation/nav'
import Button, { buttonBase } from '../ui/button'
import { ThemeToggle } from './theme-toggle'

const LOGO_MARK_SRC = '/logo-images/logo.svg'
const NAME_MARK_SRC = '/logo-images/name.svg'

function BrandLogo({
  priority = false,
  scrolled = false,
  atTop = false,
  isMobileMenu = false,
}: {
  priority?: boolean
  scrolled?: boolean
  atTop?: boolean
  isMobileMenu?: boolean
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
          scrolled
            ? 'h-7 sm:h-8 md:h-9 lg:h-10'
            : 'h-8 sm:h-10 md:h-11 lg:h-14',
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
          'block aspect-[448/76] shrink-0 transition-all duration-500 ease-in-out',
          atTop && !isMobileMenu ? 'bg-text-standard' : 'bg-header-ink',
          scrolled ? 'h-4 sm:h-6 md:h-6 lg:h-9' : 'h-5 sm:h-7 md:h-7 lg:h-11',
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
    pathname.startsWith('/our-works/programs-and-projects/') &&
    !pathname.includes('/page/')
  const isUpdatesPost =
    (pathname.startsWith('/updates/announcements/') ||
      pathname.startsWith('/updates/community-stories/')) &&
    !pathname.includes('/page/')
  const forceSolidNav = isProgramPost || isUpdatesPost
  const isTransparent = atTop && !forceSolidNav

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ease-in-out',
          isTransparent
            ? 'border-transparent bg-transparent'
            : 'border-header-border bg-header-bg',
        )}
      >
        <div
          className={cn(
            'px-4 transition-all duration-500 ease-in-out md:py-4 lg:px-8',
            scrolled ? 'py-3' : 'py-5',
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 sm:gap-2 md:gap-3">
            <Button
              variant="ghost"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className={cn(
                'shrink-0 p-0 transition-colors duration-500 ease-in-out md:hidden mr-1 w-9 sm:w-10',
                isTransparent
                  ? 'text-text-standard hover:bg-text-standard/10'
                  : 'text-header-ink hover:bg-header-ink/10',
              )}
            >
              <Menu className="size-5 sm:size-6" aria-hidden="true" />
            </Button>

            <Link
              href="/"
              aria-label="GDFI — home"
              className="flex shrink-0 items-center gap-2"
            >
              <BrandLogo priority scrolled={scrolled} atTop={isTransparent} />
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-0.5 md:flex lg:gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                const triggerClass = cn(
                  'whitespace-nowrap rounded-full px-2 py-2 text-xs font-semibold transition-colors lg:px-3.5 lg:text-sm',
                  active
                    ? isTransparent
                      ? 'bg-text-standard/15 text-text-standard'
                      : 'bg-header-ink/10 text-header-ink'
                    : isTransparent
                      ? 'text-text-standard hover:bg-text-standard/10'
                      : 'text-header-ink hover:bg-header-ink/5',
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
                            : 'border-header-border bg-header-bg shadow-lg',
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
                                  ? isTransparent
                                    ? 'bg-primary/10 text-primary-hover'
                                    : 'bg-header-ink/10 text-header-ink'
                                  : isTransparent
                                    ? 'text-text-standard hover:bg-text-standard/10'
                                    : 'text-header-ink hover:bg-header-ink/5',
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

            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              <ThemeToggle
                className={cn(
                  'size-9 sm:size-10 transition-colors duration-500 ease-in-out',
                  isTransparent
                    ? 'border-text-standard/40 text-text-standard hover:bg-text-standard/10'
                    : 'border-header-ink/20 text-header-ink hover:bg-header-ink/5',
                )}
              />

              <Link
                href="/get-involved"
                aria-label="Get Involved"
                className={cn(
                  buttonBase,
                  'inline-flex shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-500 ease-in-out active:scale-95',
                  'size-9 sm:size-10 lg:h-auto lg:w-auto lg:px-4 lg:py-2',
                  isTransparent
                    ? 'border-text-standard/40 bg-transparent text-text-standard hover:bg-text-standard/10'
                    : 'border-transparent bg-header-ink text-header-bg shadow-sm hover:bg-header-ink-hover',
                  scrolled ? 'lg:px-5' : 'lg:px-4',
                )}
              >
                <HandHeart className="size-4 sm:size-5" aria-hidden="true" />
                <span
                  className={cn(
                    'hidden overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out lg:inline-block lg:align-middle',
                    scrolled
                      ? 'lg:ml-0 lg:max-w-0 lg:opacity-0'
                      : 'lg:ml-2 lg:max-w-28 lg:opacity-100',
                  )}
                >
                  Get Involved
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        onClick={closeMobile}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-50 bg-ink-strong/40',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        ref={menuRef}
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-hidden={!mobileOpen}
        aria-label="Site menu"
        className={cn(
          'fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 rounded-2xl border border-header-border bg-header-bg p-5 sm:p-6 shadow-xl',
          'max-h-[calc(100dvh-env(safe-area-inset-bottom)-1.5rem)] flex-col',
          mobileOpen ? 'flex' : 'pointer-events-none hidden',
        )}
      >
        <div className="mx-auto flex w-full max-w-md flex-col min-h-0">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="GDFI — home"
              onClick={closeMobile}
              className="flex items-center gap-2"
            >
              <BrandLogo isMobileMenu />
            </Link>
            <Button
              variant="ghost"
              aria-label="Close menu"
              onClick={closeMobile}
              className="shrink-0 rounded-full p-2 text-header-ink/70 hover:bg-header-ink/5 hover:text-header-ink"
            >
              <X size={24} aria-hidden="true" />
            </Button>
          </div>

          <nav className="mt-4 sm:mt-6 flex flex-col gap-0.5 overflow-y-auto overscroll-contain pb-2">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const rowClass = cn(
                'rounded-xl px-4 py-2 text-lg font-semibold transition-colors shrink-0',
                active
                  ? 'bg-header-ink/10 text-header-ink'
                  : 'text-header-ink hover:bg-header-ink/5',
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
                <div key={link.href} className="shrink-0">
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
                      className={cn(
                        'transition-transform duration-200',
                        open && 'rotate-180',
                      )}
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
                                ? 'bg-header-ink/10 text-header-ink'
                                : 'text-header-ink hover:bg-header-ink/5',
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
