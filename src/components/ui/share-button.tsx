'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Share2, Link2, Check } from 'lucide-react'
import { SiFacebook, SiInstagram, SiX } from '@icons-pack/react-simple-icons'
import { cn } from '@/lib/utils'

const MENU_WIDTH = 176 // w-44
const MENU_HEIGHT = 196 // approximate — used only for open-direction decision

interface ShareButtonProps {
  /** URL to share. Relative paths are resolved to absolute. Defaults to current page URL. */
  url?: string
  title: string
  /** Optional description passed to navigator.share on supported browsers. */
  text?: string
  /** Show a "Share" label next to the icon. Renders as a pill button. */
  showLabel?: boolean
  /** Applied to the trigger button element. */
  className?: string
}

export default function ShareButton({
  url,
  title,
  text,
  showLabel = false,
  className,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const getUrl = useCallback((): string => {
    const raw =
      url ?? (typeof window !== 'undefined' ? window.location.href : '')
    if (typeof window === 'undefined') return raw
    if (raw.startsWith('http')) return raw
    return `${window.location.origin}${raw.startsWith('/') ? '' : '/'}${raw}`
  }, [url])

  const positionMenu = useCallback(() => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const goDown =
      window.innerHeight - rect.bottom >= MENU_HEIGHT || rect.top < MENU_HEIGHT
    setMenuStyle({
      position: 'fixed',
      width: MENU_WIDTH,
      right: Math.max(8, window.innerWidth - rect.right),
      ...(goDown
        ? { top: rect.bottom + 8 }
        : { bottom: window.innerHeight - rect.top + 8 }),
      zIndex: 9999,
    })
  }, [])

  useEffect(() => {
    if (!open) return
    positionMenu()
    const onClickOutside = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      )
        setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    window.addEventListener('scroll', positionMenu, true)
    window.addEventListener('resize', positionMenu)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      window.removeEventListener('scroll', positionMenu, true)
      window.removeEventListener('resize', positionMenu)
    }
  }, [open, positionMenu])

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: getUrl() })
        return
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        // non-abort error — fall through to dropdown
      }
    }
    setOpen((o) => !o)
  }

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(getUrl())
    setCopied(true)
    setOpen(false)
    setTimeout(() => setCopied(false), 2000)
  }

  const platformLinks = [
    {
      label: 'Facebook',
      Icon: SiFacebook,
      href: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
    },
    {
      label: 'X',
      Icon: SiX,
      href: () =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}`,
    },
  ]

  const menu = open && (
    <div
      ref={menuRef}
      style={menuStyle}
      className="rounded-xl border border-foreground/10 bg-background shadow-lg overflow-hidden py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {platformLinks.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors"
        >
          <Icon size={15} aria-hidden />
          {label}
        </a>
      ))}
      {/* Instagram has no web share URL — copies link for user to paste */}
      <button
        onClick={copyToClipboard}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors"
      >
        <SiInstagram size={15} aria-hidden />
        Instagram
      </button>
      <div className="my-1 border-t border-foreground/10" />
      <button
        onClick={copyToClipboard}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors"
      >
        {copied ? (
          <Check size={15} className="text-green-500" aria-hidden />
        ) : (
          <Link2 size={15} aria-hidden />
        )}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        aria-label="Share"
        aria-expanded={open}
        className={cn(
          'flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50',
          showLabel
            ? 'h-9 rounded-full px-4 text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/10'
            : 'w-8 h-8 rounded-full text-foreground/50 hover:text-foreground hover:bg-foreground/10',
          className,
        )}
      >
        <Share2 size={15} />
        {showLabel && <span>Share</span>}
      </button>
      {typeof document !== 'undefined' && createPortal(menu, document.body)}
    </div>
  )
}
