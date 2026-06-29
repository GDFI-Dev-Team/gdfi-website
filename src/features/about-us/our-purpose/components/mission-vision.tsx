import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import {
  MISSION_TEXT,
  VISION_TEXT,
  MISSION_VISION_IMAGES,
} from '../data/constants'
import MissionSlideshow from './mission-slideshow'

export function MissionVision() {
  return (
    <div className="bg-foreground/[0.03]">
      <Section maxWidth="6xl" sectionClassName="py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <MissionSlideshow
            images={MISSION_VISION_IMAGES}
            alt="Our mission and vision in action"
          />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Heading level={2}>Our Mission</Heading>
              <Text size="lg" className="leading-relaxed">
                {MISSION_TEXT}
              </Text>
            </div>

            <div className="flex flex-col gap-3">
              <Heading level={2}>Our Vision</Heading>
              <Text size="lg" className="leading-relaxed">
                {VISION_TEXT}
              </Text>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
