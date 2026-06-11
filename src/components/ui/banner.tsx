import Breadcrumbs from './breadcrumbs'
import Heading from './heading'
import Text from './text'

export default function Banner({
  imgUrl,
  title,
  description,
}: {
  imgUrl: string
  title: string
  description: string
}) {
  return (
    <section
      className="px-(--gutter) relative flex flex-col justify-end min-h-66 md:min-h-96 pb-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="absolute inset-0 bg-background/40" />
      <div className="relative z-10">
        <Breadcrumbs last={title} />
        <Heading level={1}>{title}</Heading>
        <Text size="lg" className="text-foreground/80 max-w-prose">
          {description}
        </Text>
      </div>
    </section>
  )
}
