import { Search } from 'lucide-react'

export default function NewsFilterBar() {
  return (
    <div className="bg-foreground/3 border-b border-foreground/10">
      <div className="mx-auto max-w-7xl px-(--gutter) py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
            size={18}
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search news and resources..."
            aria-label="Search news and resources"
            className="w-full pl-10 pr-4 py-2.5 rounded-md border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-btn-primary/50 transition-shadow"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <select
            aria-label="Filter by category"
            className="w-full sm:w-auto px-3 py-2.5 rounded-md border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-btn-primary/50 transition-shadow cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="updates">Latest Updates</option>
            <option value="interviews">Featured Interview</option>
            <option value="stories">Community Stories</option>
          </select>

          <select
            aria-label="Sort order"
            className="w-full sm:w-auto px-3 py-2.5 rounded-md border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-btn-primary/50 transition-shadow cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  )
}
