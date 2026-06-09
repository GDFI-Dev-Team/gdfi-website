import { Hero } from '@/features/home/components/hero'

export default function Home() {
  return (
    <>
      <Hero />

      {/* TEMP: scroll-test filler — delete this whole block when done. */}
      {['Section A', 'Section B', 'Section C', 'Section D'].map((label, i) => (
        <section
          key={label}
          className={`flex min-h-screen flex-col items-center justify-center gap-2 ${
            i % 2 === 0 ? 'bg-primary-100' : 'bg-accent-100'
          }`}
        >
          <p className="text-2xl font-semibold text-ink-strong">{label}</p>
        </section>
      ))}
      {/* END TEMP */}
    </>
  )
}
