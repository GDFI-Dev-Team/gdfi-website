'use client'

import { useState } from 'react'
import { Landmark, Package, Info, Mail, Copy, Check } from 'lucide-react'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils/cn-merge'
import {
  CASH_DONATION_DETAILS,
  IN_KIND_DONATION_DETAILS,
} from '../data/donations'

function CopyButton({
  textToCopy,
  label,
}: {
  textToCopy: string
  label: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      title={`Copy ${label}`}
      className="p-1.5 text-foreground/40 hover:text-foreground hover:bg-foreground/10 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
    >
      {copied ? (
        <Check
          size={16}
          className="text-green-600 dark:text-green-400"
          aria-hidden="true"
        />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
    </button>
  )
}

export default function SupportOptions() {
  return (
    <Section>
      <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16 max-w-3xl mx-auto">
        <Heading level={2}>Support Us</Heading>
        <Text size="lg" className="leading-relaxed text-foreground/80">
          Whether through financial support or in-kind contributions, your
          generosity allows us to continue our ridge-to-reef conservation
          efforts.
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left">
        <div className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-btn-primary/10 p-4 rounded-full shrink-0">
              <Landmark
                size={32}
                className="text-btn-primary"
                aria-hidden="true"
              />
            </div>
            <Heading level={3} className="text-foreground/80">
              {CASH_DONATION_DETAILS.title}
            </Heading>
          </div>

          <Text className="text-foreground/80">
            {CASH_DONATION_DETAILS.description}
          </Text>

          <div className="bg-foreground/3 rounded-2xl p-6 border border-foreground/5">
            <Heading level={4} className="mb-4 text-lg">
              Bank Transfer Details
            </Heading>
            <dl className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 gap-x-4 text-sm">
              {CASH_DONATION_DETAILS.bankDetails.map((detail, index) => (
                <div key={index} className="contents">
                  <dt className="text-foreground/60 font-medium flex items-center">
                    {detail.label}
                  </dt>
                  <dd className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-foreground',
                        detail.isMono
                          ? 'font-mono font-semibold tracking-wide'
                          : 'font-semibold',
                      )}
                    >
                      {detail.value}
                    </span>
                    {detail.isCopyable && (
                      <CopyButton
                        textToCopy={detail.value}
                        label={detail.label}
                      />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex gap-3 bg-cyan-100/50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50 rounded-2xl p-5">
            <Info
              size={20}
              className="text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-2">
              <Text
                size="sm"
                className="font-semibold text-cyan-900 dark:text-cyan-100"
              >
                {CASH_DONATION_DETAILS.taxNote.title}
              </Text>
              <Text
                size="sm"
                className="text-cyan-800 dark:text-cyan-300 leading-relaxed"
              >
                {CASH_DONATION_DETAILS.taxNote.description}
              </Text>
              <a
                href={`mailto:${CASH_DONATION_DETAILS.taxNote.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-200 transition-colors mt-1"
              >
                <Mail size={14} aria-hidden="true" />
                {CASH_DONATION_DETAILS.taxNote.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-btn-primary/10 p-4 rounded-full shrink-0">
              <Package
                size={32}
                className="text-btn-primary"
                aria-hidden="true"
              />
            </div>
            <Heading level={3} className="text-foreground/80">
              {IN_KIND_DONATION_DETAILS.title}
            </Heading>
          </div>

          <Text className="text-foreground/80">
            {IN_KIND_DONATION_DETAILS.description}
          </Text>

          <div className="bg-foreground/3 rounded-2xl p-6 border border-foreground/5">
            <div className="flex items-center justify-between mb-4">
              <Heading level={4} className="text-lg">
                Shipping Address
              </Heading>
              <CopyButton
                textToCopy={IN_KIND_DONATION_DETAILS.copyableShippingAddress}
                label="Shipping Address"
              />
            </div>
            <address className="not-italic flex flex-col gap-1 text-foreground/80 leading-relaxed">
              {IN_KIND_DONATION_DETAILS.shippingAddress.map((line, index) => (
                <span
                  key={index}
                  className={index === 0 ? 'font-semibold text-foreground' : ''}
                >
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>
    </Section>
  )
}
