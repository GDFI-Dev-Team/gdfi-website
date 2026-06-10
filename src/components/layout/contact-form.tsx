'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { cn } from '../../lib/utils'

const fieldClass = cn(
  'w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white',
  'placeholder:text-white/40 transition-colors',
  'focus:border-white/30 focus:bg-white/10 focus:outline-none',
)

/**
 * Footer contact form. Frontend-only for now — submitting just shows a
 * confirmation. Wire `handleSubmit` to a real endpoint / action later.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: send to backend (API route / server action) once available.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="mt-4 rounded-lg border border-white/15 bg-white/5 px-3 py-4 text-sm text-white/80">
        Thanks for reaching out — we&apos;ll get back to you soon.
      </p>
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
      <button
        type="submit"
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full bg-primary-400 px-4 py-2',
          'text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out',
          'hover:bg-primary-500 active:scale-95',
        )}
      >
        Send message
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  )
}

export default ContactForm
