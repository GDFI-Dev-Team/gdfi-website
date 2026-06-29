'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'

/**
 * The current theme lives in the `dark` class on <html>, applied by the
 * no-flash script in layout.tsx before paint. We read it as an external store
 * so hydration renders the server snapshot first, then syncs to the real DOM
 * value after — no effect, no hydration mismatch.
 */
const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  // Cross-tab changes also arrive via the storage event.
  window.addEventListener('storage', callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

function notify() {
  for (const listener of listeners) listener()
}

function getSnapshot(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'light'
}

/**
 * Circular outlined icon button that toggles light/dark mode.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const isDark = theme === 'dark'

  const toggle = useCallback(() => {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    notify()
  }, [isDark])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  )
}

export default ThemeToggle
