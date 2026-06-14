'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { navLinks } from '../../lib/navigation'
import Button, { buttonBase, buttonVariants } from '../ui/button'

const LOGO_SRC = '/logo-images/logo_with_name_dark.svg'

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  const menuRef = useRef<HTMLDivElement>(null)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setOpenSubmenu(null)
  }, [])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-white">
        <div className="px-(--gutter) py-3 md:py-4">
          <div className="mx-auto grid max-w-7xl grid-cols-[0.7fr_auto_1.5fr] items-center gap-0 md:grid-cols-[auto_1fr_auto]">
            {/* Hamburger — mobile only, left */}
            <Button
              variant="ghost"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="justify-self-start p-2 text-foreground hover:bg-foreground/5 md:hidden"
            >
              <Menu size={26} aria-hidden="true" />
            </Button>

            {/* Logo — center on mobile, left on desktop */}
            <Link
              href="/"
              aria-label="GDFI — home"
              className="col-start-2 flex items-center justify-self-center md:col-start-1 md:justify-self-start"
            >
              <Image
                src={LOGO_SRC}
                loading="eager"
                alt="Guiuan Development Foundation Inc."
                width={414}
                height={62}
                priority
                className="h-7 w-auto"
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
                      <ChevronDown size={16} />
                    </Link>
                    <div className="invisible absolute left-0 top-full z-10 pt-2 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="min-w-60 rounded-2xl border border-foreground/10 bg-white p-1.5 shadow-lg">
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

            {/* Donate — right */}
            <Link
              href="/donate"
              className={cn(
                buttonBase,
                buttonVariants.primary,
                'col-start-3 shrink-0 justify-self-end rounded-full px-4 py-2 text-sm font-semibold',
              )}
            >
              Donate
            </Link>
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
          'fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 rounded-2xl border border-foreground/10 bg-white p-6 shadow-xl',
          mobileOpen ? 'block' : 'pointer-events-none hidden',
        )}
      >
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="GDFI — home"
              onClick={closeMobile}
              className="flex items-center"
            >
              <Image
                src={LOGO_SRC}
                alt="Guiuan Development Foundation Inc."
                width={414}
                height={62}
                className="h-7 w-auto"
              />
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
