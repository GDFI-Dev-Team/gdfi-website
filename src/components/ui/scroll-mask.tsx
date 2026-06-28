'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

type ScrollEdge = 'none' | 'top' | 'bottom' | 'both'

const MASKS: Record<ScrollEdge, string> = {
  none: 'none',
  top: 'linear-gradient(to bottom, transparent, black 3rem)',
  bottom: 'linear-gradient(to bottom, black calc(100% - 3rem), transparent)',
  both: 'linear-gradient(to bottom, transparent, black 3rem, black calc(100% - 3rem), transparent)',
}

function useScrollMask<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [edge, setEdge] = useState<ScrollEdge>('bottom')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if (atTop && atBottom) setEdge('none')
      else if (atTop) setEdge('bottom')
      else if (atBottom) setEdge('top')
      else setEdge('both')
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  return { ref, maskImage: MASKS[edge] }
}

interface ScrollMaskProps {
  children: ReactNode
  maxHeight?: string
  className?: string
}

export default function ScrollMask({
  children,
  maxHeight = '60vh',
  className = '',
}: ScrollMaskProps) {
  const { ref, maskImage } = useScrollMask<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`overflow-y-auto ${className}`}
      style={{ maxHeight, maskImage }}
    >
      {children}
    </div>
  )
}
