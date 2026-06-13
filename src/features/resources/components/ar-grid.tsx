import AnnualReportCard from './ar-card'

export default function AnnualReportGrid() {
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-6 list-none">
        {Array.from({ length: 6 }).map((_, index) => (
          <AnnualReportCard key={index} />
        ))}
      </ul>
    </div>
  )
}
