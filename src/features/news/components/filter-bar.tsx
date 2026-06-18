import { Search } from 'lucide-react'

export default function NewsFilterBar() {
  const inputClasses =
    'px-3 py-2.5 rounded-md border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-btn-primary/50 transition-shadow'

  return (
    <div className="bg-foreground/3 border-b border-foreground/10">
      <div className="mx-auto max-w-7xl px-(--gutter) py-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="relative w-full lg:max-w-sm shrink-0">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
            size={18}
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search news and resources..."
            aria-label="Search news and resources"
            className={`w-full pl-10 pr-4 ${inputClasses} placeholder:text-foreground/40`}
          />
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <select
            aria-label="Filter by category"
            className={`w-full sm:w-auto cursor-pointer ${inputClasses}`}
          >
            <option value="all">All Categories</option>
            <option value="updates">Latest Updates</option>
            <option value="interviews">Featured Interview</option>
            <option value="stories">Community Stories</option>
          </select>

          <select
            aria-label="Sort order"
            className={`w-full sm:w-auto cursor-pointer ${inputClasses}`}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <input
              type="date"
              aria-label="Start date"
              className={`w-full sm:w-auto ${inputClasses}`}
            />
            <span className="text-foreground/50 text-sm font-medium">to</span>
            <input
              type="date"
              aria-label="End date"
              className={`w-full sm:w-auto ${inputClasses}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
