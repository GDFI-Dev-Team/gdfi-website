import Text from '@/components/ui/text'
import PublicationCard from './pub-card'
import ScrollMask from '@/components/ui/scroll-mask'
import { Publication } from '@/lib/content/types'

export default function PublicationList({
  publications,
}: {
  publications: Publication[]
}) {
  const filtered = publications

  return (
    <>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 py-20 text-center">
          <Text size="sm" className="font-medium text-foreground/50">
            No publications found
          </Text>
          <Text size="xs" className="text-foreground/35">
            Try a different search or year
          </Text>
        </div>
      ) : (
        <ScrollMask>
          <ul className="flex list-none flex-col gap-4">
            {filtered.map((pub, i) => (
              <PublicationCard key={pub.slug} publication={pub} index={i} />
            ))}
          </ul>
        </ScrollMask>
      )}
    </>
  )
}
