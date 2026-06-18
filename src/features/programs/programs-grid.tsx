import ProgramCard from '@/features/programs/program-card'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function ProgramsGrid() {
  return (
    <section className="px-(--gutter) py-16 md:py-24 self-center">
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search GDFI programs..."
          aria-label="Search GDFI programs"
        />

        <select name="Program Status">
          <option disabled>Program Status</option>
          <option value="active">Completed</option>
          <option value="active">Active</option>
          <option value="active">Discontinued</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 align-center mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProgramCard
            key={index}
            title="GDFI Educational Assistance Program"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            imageUrl="/feat-hero/hero-1.webp"
            status="Active"
            href="/programs/tamaraw-conservation"
          />
        ))}
      </div>

      <div className="flex items-center justify-center mt-10">
        <Button variant="ghost" className="p-1.5" aria-label="Previous page">
          <ChevronLeft className="size-8" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Button variant="secondary" key={index} className="px-4 py-2">
              <Text size="xs">{index + 1}</Text>
            </Button>
          ))}
        </div>

        <Button variant="ghost" className="p-1.5" aria-label="Next page">
          <ChevronRight className="size-8" />
        </Button>
      </div>
    </section>
  )
}
