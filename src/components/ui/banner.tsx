import Image from 'next/image'
import Breadcrumbs from './breadcrumbs'
import Heading from './heading'
import Text from './text'
import { cn } from '@/lib/utils/cn-merge'

export default function Banner({
  imgUrl,
  title,
  description,
  breadcrumbClassName,
  titleClassName,
  descriptionClassName,
}: {
  imgUrl: string
  title: string
  description: string
  breadcrumbClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}) {
  return (
    <section className="relative isolate flex min-h-80 flex-col justify-end overflow-hidden px-(--gutter) pb-14 md:min-h-136 md:pb-20">
      <Image
        src={imgUrl}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-r from-hero-overlay/80 via-hero-overlay/30 via-25% to-transparent to-50% transition-[--hero-overlay] duration-300 ease-[ease] dark:from-hero-overlay/80 dark:via-hero-overlay/40" />
      <div className="absolute inset-0 bg-linear-to-t from-hero-overlay/80 via-hero-overlay/30 to-hero-overlay/10 transition-[--hero-overlay] duration-300 ease-[ease] dark:from-hero-overlay/30 dark:via-hero-overlay/20 dark:to-hero-overlay/10" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-hero-overlay/80 to-transparent transition-[--hero-overlay] duration-300 ease-[ease]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-3 [text-shadow:0_1px_3px_rgb(0_0_0_/0.4)] md:gap-4">
        <Breadcrumbs last={title} className={breadcrumbClassName} />
        <Heading
          level={1}
          className={cn(
            'text-balance text-3xl text-text-standard leading-tight transition-colors duration-300 ease-[ease] md:text-4xl lg:text-6xl',
            titleClassName,
          )}
        >
          {title}
        </Heading>
        <Text
          className={cn(
            'max-w-prose text-sm text-text-muted transition-colors duration-300 ease-[ease] md:text-lg',
            descriptionClassName,
          )}
        >
          {description}
        </Text>
      </div>
    </section>
  )
}
