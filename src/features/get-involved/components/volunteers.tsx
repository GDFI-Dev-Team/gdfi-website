import Image from 'next/image'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn-merge'
import { socials } from '@/lib/navigation/nav'

export default function Volunteers() {
  return (
    <Section sectionClassName="bg-foreground/[0.02]">
      <Heading className="mb-8 text-center md:mb-12" level={2}>
        Volunteer Opportunities
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex flex-col gap-4 text-foreground/80">
            <Heading level={3}>Dive In With Us</Heading>
            <Text>
              You don&apos;t need a formal job title to make a wave. From
              helping out with local mangrove planting and beach cleanups to
              sharing your skills in digital storytelling, photography, or data
              mapping, your time can make a massive difference for the coastal
              communities of Eastern Visayas.
            </Text>
            <Text>
              Whether you want to help out on the ground here in Guiuan or
              support our team remotely, we welcome your energy. Drop us a line
              or send us a message on our Facebook page to see how you can get
              involved.
            </Text>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="mailto:hello.gdfi@gmail.com"
              className={cn(buttonBase, buttonVariants.primary, 'px-6 py-2.5')}
            >
              Email Us
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonBase,
                buttonVariants.secondary,
                'px-6 py-2.5 bg-background',
              )}
            >
              Message on Facebook
            </a>
          </div>
        </div>

        <figure className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-lg m-0 order-1 lg:order-2">
          <Image
            src="/feat-hero/hero-2.jpeg"
            alt="Volunteer Opportunities"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
    </Section>
  )
}
