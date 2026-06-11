'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { cn } from '../../lib/utils'
import Text from '../ui/text'
import Button from '../ui/button'

const fieldClass = cn(
  'w-full rounded-lg border border-footer-field-border bg-footer-surface px-3 py-2 text-sm text-footer-text-strong',
  'placeholder:text-footer-placeholder transition-colors',
  'focus:border-footer-field-border-focus focus:bg-footer-surface-hover focus:outline-none',
)

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: send to backend (API route / server action) once available.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Text
        size="sm"
        className="mt-4 rounded-lg border border-footer-field-border bg-footer-surface px-3 py-4 text-footer-text-secondary"
      >
        Thanks for reaching out — we&apos;ll get back to you soon.
      </Text>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        aria-label="Your name"
        className={fieldClass}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        aria-label="Your email"
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
        className="rounded-full px-4 py-2 text-sm font-semibold gap-2"
      >
        Send message
        <Send size={16} aria-hidden="true" />
      </Button>
    </form>
  )
}

export default ContactForm
