import { Hero } from '@/features/home/components/hero'
import WhoWeAre from '@/features/home/components/who-we-are'
// import WhatWeDo from '@/features/home/components/what-we-do'
// import WhereWeOperate from '@/features/home/components/where-we-operate'
import Stories from '@/features/home/components/stories'
import OurLatestUpdates from '@/features/home/components/our-latest-updates'
import FeaturedInterviews from '@/features/home/components/featured-interviews'
// import GetInvolved from '@/features/home/components/get-involved'
import Partners from '@/features/home/components/partners'

// Homepage sections alternate white / tinted (`bg-foreground/3`) bands,
// bookended by the dark hero and footer. Every section uses
// `px-[var(--gutter)]` so its text lines up with the navbar logo and hero.
// Adjust the gutter in ONE place — src/styles/globals.css:
//   • mobile  → the `--gutter` value in :root
//   • desktop → the `--gutter` override inside the `@media (min-width: 768px)`

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      {/* <WhatWeDo />*/}
      {/* <WhereWeOperate /> */}
      <Stories />
      <OurLatestUpdates />
      <FeaturedInterviews />
      {/* <GetInvolved /> */}
      <Partners />
    </>
  )
}
