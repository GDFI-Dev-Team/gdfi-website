'use client'

import { Send } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'
import Button from '../ui/button'

const fieldClass = cn(
  'w-full rounded-lg border border-footer-field-border bg-footer-surface px-3 py-2 text-sm text-footer-text-strong',
  'placeholder:text-footer-placeholder transition-colors',
  'focus:border-footer-field-border-focus focus:bg-footer-surface-hover focus:outline-none',
)

// Messages are routed to GDFI's shared inbox; the project lead is cc'd.
const MAIL_TO = 'hello.gdfi@gmail.com'
const MAIL_CC = 'leoabuda.gdfi@gmail.com'

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const subject = (form.elements.namedItem('subject') as HTMLInputElement)
      .value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)
      .value

    const url =
      `mailto:${MAIL_TO}` +
      `?cc=${encodeURIComponent(MAIL_CC)}` +
      `&subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(message)}`

    window.location.href = url
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <input
        type="text"
        name="subject"
        required
        placeholder="Subject"
        aria-label="Subject"
        className={fieldClass}
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Your message"
        aria-label="Your message"
        className={cn(fieldClass, 'resize-y')}
      />
      <Button
        type="submit"
        className="gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out"
      >
        Send via email
        <Send size={16} aria-hidden="true" />
      </Button>
    </form>
  )
}

export default ContactForm
