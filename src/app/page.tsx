import { Hero } from '../features/home/components/hero'
import WhoWeAre from '@/features/home/components/who-we-are'
import OurLatestUpdates from '@/features/home/components/our-latest-updates'
import FeaturedInterviews from '@/features/home/components/featured-interviews'
import Partners from '@/features/home/components/partners'

// Sample homepage sections — placeholder content to lay out and adjust.
// Every section uses `px-[var(--gutter)]` so its text lines up with the
// navbar logo and hero. Adjust the gutter in ONE place — src/styles/globals.css:
//   • mobile  → the `--gutter` value in :root
//   • desktop → the `--gutter` override inside the `@media (min-width: 768px)`

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <OurLatestUpdates />
      <FeaturedInterviews />
      <Partners />
    </>
  )
}
