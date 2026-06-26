'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  title: string
  text?: string
  url: string
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  showLabel?: boolean
}

export default function ShareButton({
  title,
  text,
  url,
  className,
  variant = 'ghost',
  showLabel = false,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const shareUrl =
      typeof window !== 'undefined'
        ? url.startsWith('http')
          ? url
          : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`
        : url

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
        return
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          fallbackCopy(shareUrl)
        }
      }
    } else {
      fallbackCopy(shareUrl)
    }
  }

  const fallbackCopy = async (shareUrl: string) => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <Button
      variant={variant}
      onClick={handleShare}
      className={cn('gap-2 transition-all', className)}
      aria-label="Share"
      title="Share"
    >
      {copied ? (
        <Check size={18} className="text-green-600 dark:text-green-400" />
      ) : (
        <Share2 size={18} />
      )}
      {showLabel && <span>{copied ? 'Copied!' : 'Share'}</span>}
    </Button>
  )
}
