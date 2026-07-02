import Image from 'next/image'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { ExternalLink } from 'lucide-react'
import MpaSection from './mpa-section'

const GMRPLS_URL = 'https://pais.bmb.gov.ph/home/info/DENRR800004'

export default function MpaShowcase() {
  return (
    <MpaSection>
      {/* Description on top, GMRPLS map below (right rail on desktop). */}
      <div className="flex flex-col gap-6 py-12 md:py-0">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-widest text-accent uppercase">
            Featured Marine Reserve
          </span>
          <Heading level={2} id="mpa-featured" className="text-balance">
            GDFI&apos;s Marine Reserve &amp; Learning Center: Bagonbanua
          </Heading>
          <Text className="leading-relaxed text-foreground/80">
            The Bagonbanua Marine Reserve and Sanctuary is a community-managed
            marine protected area on Bagonbanua Island in Guiuan, Eastern Samar.
            GDFI helped bring it to life: following a 1989 coastal resource
            assessment carried out with the Philippine Council for Aquatic and
            Marine Research and Development (PCAMRD), the reserve&apos;s
            boundaries were delineated in 1991 and formally protected under a
            municipal ordinance in 1992.
          </Text>
          <Text className="leading-relaxed text-foreground/80">
            Covering 28.30 hectares, the reserve is safeguarded by the local
            community to conserve marine life and keep the surrounding waters
            productive for generations to come. Hover, scroll, or tap the map to
            zoom from Samar down to the sanctuary&apos;s boundary.
          </Text>
        </div>

        {/* Bagonbanua is one of several sites GDFI supports in the region. */}
        <div className="flex flex-col gap-3 border-t border-foreground/10 pt-6">
          <Text size="sm" className="leading-relaxed text-foreground/70">
            Bagonbanua is not the only protected area GDFI works with. It sits
            within the wider{' '}
            <span className="font-semibold text-foreground/90">
              Guiuan Marine Resource Protected Landscape and Seascape (GMRPLS)
            </span>{' '}
            — a nationally protected land- and seascape spanning the Guiuan
            peninsula and its surrounding waters.
          </Text>

          <a
            href={GMRPLS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl ring-1 ring-foreground/10 transition hover:ring-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src="/mpa/GMRPLS_TD_Maps1.webp"
              alt="Technical description map of the Guiuan Marine Resource Protected Landscape and Seascape (GMRPLS)"
              width={1255}
              height={857}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/70 to-transparent px-4 py-3 text-sm font-medium text-white">
              View the GMRPLS on the DENR–BMB protected areas registry
              <ExternalLink className="size-4 shrink-0" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </MpaSection>
  )
}
