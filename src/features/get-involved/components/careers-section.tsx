import Image from 'next/image'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import Section from '@/components/ui/section'
import { cn } from '@/lib/utils/cn-merge'

export default function CareersSection() {
  return (
    <Section divClassName="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <figure className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-lg m-0">
        <Image
          src="/feat-hero/hero-1.jpeg"
          alt="Careers and Internships"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </figure>

      <div className="flex flex-col gap-6">
        <Heading level={2}>Join Our Journey</Heading>
        <div className="flex flex-col gap-4 text-foreground/80">
          <Text>
            {' '}
            We don&apos;t have any open staff positions or formal internship
            slots right now, but we are always looking for passionate minds. If
            you&apos;re deeply committed to marine conservation, community
            empowerment, and protecting our coastal ecosystems, we&apos;d love
            to know who you are.
          </Text>
          <Text>
            Feel free to send your CV and a short note about your background.
            We&apos;ll keep your details on hand and reach out the moment a spot
            opens up.
          </Text>
        </div>
        <a
          href="mailto:hello.gdfi@gmail.com"
          className={cn(
            buttonBase,
            buttonVariants.primary,
            'self-start px-6 py-2.5 mt-2',
          )}
        >
          Email Your CV
        </a>
      </div>
    </Section>
  )
}
