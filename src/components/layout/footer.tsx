import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons'
import { navLinks, org, socials } from '../../lib/data'
import { ContactForm } from './contact-form'

const LOGO_SRC = '/logo-images/logo_with_name_white.svg'

const socialLinks = [
  { label: 'Facebook', href: socials.facebook, Icon: SiFacebook },
  { label: 'Instagram', href: socials.instagram, Icon: SiInstagram },
]

export function Footer() {
  return (
    <footer className="bg-primary-950 text-white/70">
      {/* px-(--gutter): same side padding as the hero and page sections, so
          footer content aligns with the rest of the site. Set in globals.css. */}
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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {org.about}
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center rounded-full bg-white/5 p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Donate — matches navbar */}
            <Link
              href="/donate"
              className="mt-6 inline-flex rounded-full bg-primary-400 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-primary-500 active:scale-95"
            >
              Donate
            </Link>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a
                  href={org.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 transition-colors hover:text-white"
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
                  className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                >
                  <Mail size={18} className="shrink-0" aria-hidden="true" />
                  <span>{org.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact us */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact us
            </h3>
            <ContactForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            © {org.founded}–{new Date().getFullYear()} {org.name}. All rights
            reserved.
          </p>
          <p>Guiuan, Eastern Samar</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
