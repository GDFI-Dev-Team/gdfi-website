import { Landmark, Package, Info, Mail } from 'lucide-react'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

export default function SupportOptions() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-8 md:p-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-btn-primary/10 p-4 rounded-full shrink-0">
            {' '}
            <Landmark
              size={32}
              className="text-btn-primary"
              aria-hidden="true"
            />
          </div>
          <Heading level={3}>Cash Donations</Heading>
        </div>

        <Text className="text-foreground/70">
          Your financial support directly funds our coastal resource management,
          livelihood programs, and environmental education initiatives.
        </Text>

        <div className="bg-foreground/3 rounded-2xl p-6 border border-foreground/5">
          <Heading level={4} className="mb-4 text-lg">
            Bank Transfer Details
          </Heading>
          <dl className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 gap-x-4 text-sm">
            <dt className="text-foreground/60 font-medium">Bank Name</dt>
            <dd className="font-semibold text-foreground">
              Banco de Oro (BDO)
            </dd>

            <dt className="text-foreground/60 font-medium">Bank Address</dt>
            <dd className="text-foreground">
              P. Burgos St. cor. Real St., Justice Romualdez St., Tacloban City
            </dd>

            <dt className="text-foreground/60 font-medium">Account Name</dt>
            <dd className="font-semibold text-foreground">
              Guiuan Development Foundation, Inc.
            </dd>

            <dt className="text-foreground/60 font-medium">Account Number</dt>
            <dd className="font-mono font-semibold text-foreground tracking-wide">
              002920154041
            </dd>

            <dt className="text-foreground/60 font-medium">SWIFT Code</dt>
            <dd className="font-mono font-semibold text-foreground tracking-wide">
              BNORPHMM
            </dd>
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
              Tax-Deductible Donations
            </Text>
            <Text
              size="sm"
              className="text-cyan-800 dark:text-cyan-300 leading-relaxed"
            >
              Tax-deductible cash donations for GDFI may also be channeled
              through Heries Funds, Myriad USA. For details, please contact
              Brenda Doriano.
            </Text>
            <a
              href="mailto:bmdoriano@yahoo.org"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-200 transition-colors mt-1"
            >
              <Mail size={14} aria-hidden="true" />
              bmdoriano@yahoo.org
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
          <Heading level={3}>In-Kind Donations</Heading>
        </div>

        <Text className="text-foreground/70">
          We welcome equipment, supplies, and materials that can aid our field
          researchers, community organizers, and local fisherfolk.
        </Text>

        <div className="bg-foreground/3 rounded-2xl p-6 border border-foreground/5">
          <Heading level={4} className="mb-4 text-lg">
            Shipping Address
          </Heading>
          <address className="not-italic flex flex-col gap-1 text-foreground/80 leading-relaxed">
            <span className="font-semibold text-foreground">
              Guiuan Development Foundation, Inc.
            </span>
            <span>Guimbaolibot Avenue, Brgy. 10</span>
            <span>Guiuan, Eastern Samar</span>
            <span>Philippines</span>
            <span>Zip Code: 6809</span>
          </address>
        </div>
      </div>
    </div>
  )
}
