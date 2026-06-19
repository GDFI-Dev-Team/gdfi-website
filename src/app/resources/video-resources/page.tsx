import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Link from 'next/link'
import Button from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export default function VideoResourcesPage() {
  return (
    <main className="flex-1">
      <Banner
        title="Video Resources"
        description="Browse the different videos of Guiuan Development Foundation Inc."
        imgUrl="/nav-item-banner-images/publications.webp"
      />
      <Section>
        <Heading level={2}>Featured Video</Heading>
        <article className="bg-foreground/10 rounded-2xl p-12 grid grid-cols-[2fr_1fr] gap-6 items-stretch">
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/TBg5-6JbOPk"
              title="Featured interview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Heading level={2} className="text-2xl md:text-2xl lg:text-2xl">
              Fisher Voices : The Struggles of Public Market Fish Vendors in
              Guiuan, Eastern Samar
            </Heading>
            <Text className="line-clamp-4">
              The story focuses on two women fish vendors (Ms. Concordia Gayoso
              and Ms. Rowena Sawaan) of more than 30 years at the Guiuan Public
              Market. Their livelihood is threatened by the continuous decrease
              in fish supply, decreasing variety of species and sizes. Abrupt
              weather change was identified as one of the main reasons for the
              low fish supply in the market. The increasing price from middlemen
              was also highlighted by the vendors as this requires them to have
              bigger capital.
            </Text>
            <Link
              href="https://www.youtube.com/embed/TBg5-6JbOPk"
              target="_blank"
            >
              <Button className="px-4 py-2" variant="primary">
                Watch <ExternalLink className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </article>

        <article className="mt-10">
          <Heading level={2}>All Videos</Heading>
          <div className="grid grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}></div>
            ))}
          </div>
        </article>
      </Section>
    </main>
  )
}
