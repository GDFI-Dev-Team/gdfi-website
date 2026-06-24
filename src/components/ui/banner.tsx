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
      className="relative isolate flex min-h-80 flex-col justify-end overflow-hidden bg-cover bg-center px-(--gutter) pb-14 md:min-h-136 md:pb-20"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      {/* Left scrim */}
      <div className="absolute inset-0 bg-linear-to-r from-hero-overlay/80 via-hero-overlay/30 via-25% to-transparent to-50% transition-[--hero-overlay] duration-300 ease-[ease] dark:from-hero-overlay/80 dark:via-hero-overlay/40" />
      {/* Bottom scrim */}
      <div className="absolute inset-0 bg-linear-to-t from-hero-overlay/80 via-hero-overlay/30 to-hero-overlay/10 transition-[--hero-overlay] duration-300 ease-[ease] dark:from-hero-overlay/30 dark:via-hero-overlay/20 dark:to-hero-overlay/10" />
      {/* Top scrim */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-hero-overlay/80 to-transparent transition-[--hero-overlay] duration-300 ease-[ease]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 [text-shadow:0_1px_3px_rgb(0_0_0_/0.4)]">
        <Breadcrumbs last={title} />
        <Heading
          level={1}
          className="max-w-4xl text-balance text-text-standard leading-tight transition-colors duration-300 ease-[ease]"
        >
          {title}
        </Heading>
        <Text
          size="lg"
          className="max-w-prose text-text-muted transition-colors duration-300 ease-[ease]"
        >
          {description}
        </Text>
      </div>
    </section>
  )
}
