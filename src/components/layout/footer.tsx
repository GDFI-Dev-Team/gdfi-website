import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons'
import { navLinks, org, socials } from '../../lib/data'
import { ContactForm } from './contact-form'
import Text from '../ui/text'
import Heading from '../ui/heading'

const LOGO_SRC = '/logo-images/logo_with_name_white.svg'

const socialLinks = [
  { label: 'Facebook', href: socials.facebook, Icon: SiFacebook },
  { label: 'Instagram', href: socials.instagram, Icon: SiInstagram },
]

export function Footer() {
  return (
    <footer className="flex bg-footer-bg text-footer-text justify-center">
      <div className="px-(--gutter) py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label={`${org.shortName} — home`}
              className="inline-flex"
            >
              <Image
                src={LOGO_SRC}
                alt={org.name}
                width={414}
                height={62}
                className="h-8 w-auto"
              />
            </Link>
            <Text size="sm" className="mt-5 max-w-sm text-footer-text-muted">
              {org.about}
            </Text>

            {/* Socials */}
            <ul className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center rounded-full bg-footer-surface p-2.5 text-footer-text transition-colors hover:bg-footer-surface-hover hover:text-footer-text-strong"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <Heading
              level={3}
              className="text-sm md:text-sm lg:text-sm font-semibold uppercase tracking-wider text-footer-text-strong"
            >
              Explore
            </Heading>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-footer-text transition-colors hover:text-footer-text-strong"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <Heading
              level={3}
              className="text-sm md:text-sm lg:text-sm font-semibold uppercase tracking-wider text-footer-text-strong"
            >
              Get in touch
            </Heading>
            <address className="not-italic">
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href={org.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-footer-text transition-colors hover:text-footer-text-strong"
                  >
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{org.address}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${org.email}`}
                    className="flex items-center gap-3 text-sm text-footer-text transition-colors hover:text-footer-text-strong"
                  >
                    <Mail size={18} className="shrink-0" aria-hidden="true" />
                    <span>{org.email}</span>
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* Contact us */}
          <div className="lg:col-span-3">
            <Heading
              level={3}
              className="text-sm md:text-sm lg:text-sm font-semibold uppercase tracking-wider text-footer-text-strong"
            >
              Contact us
            </Heading>
            <ContactForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between mt-14 border-t border-footer-border pt-8">
          <Text size="xs" className="text-footer-text-faint">
            &#169; {org.founded}–{new Date().getFullYear()} {org.name}
          </Text>
          <Text size="xs" className="text-footer-text-faint">
            Terms of Service &#xb7; Privacy Policy
          </Text>
        </div>
      </div>
    </footer>
  )
}

export default Footer
