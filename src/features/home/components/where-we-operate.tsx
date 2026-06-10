import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

const municipalities = [
  'Lawaan',
  'Balangiga',
  'Giporlos',
  'Quinapondan',
  'Salcedo',
  'Mercedes',
  'Guiuan',
]

const WhereWeOperate = () => {
  return (
    <Section
      aria-labelledby="where-we-operate-heading"
      sectionClassName="bg-foreground/3"
      divClassName="flex flex-col gap-8"
    >
      <Heading id="where-we-operate-heading" level={2} className="text-center">
        Where We Operate
      </Heading>

      {/*
        Map area — replace this placeholder with either:
          <Image src="/maps/eastern-samar.webp" alt="Map of the 7 municipalities" fill … />
          or an interactive embed (Leaflet, Mapbox, Google Maps iframe)
        Parent must keep `relative` + an explicit aspect ratio for fill images.
      */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-foreground/5 flex items-center justify-center">
        <Text className="text-foreground/30">Map placeholder</Text>
      </div>

      {/* Caption bar */}
      <div className="bg-btn-primary rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0 text-center sm:text-left">
          <Heading level={3} className="text-white">
            7 coastal municipalities
          </Heading>
          <Text size="sm" className="text-white/70">
            Eastern Samar, Philippines
          </Text>
        </div>

        <div className="hidden sm:block self-stretch w-px bg-white/25" />

        <ul
          aria-label="List of municipalities"
          className="flex flex-wrap gap-2 justify-center sm:justify-start list-none"
        >
          {municipalities.map((name) => (
            <li key={name} className="bg-white/15 px-3 py-1 rounded-full">
              <Text size="sm" className="text-white">
                {name}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default WhereWeOperate
