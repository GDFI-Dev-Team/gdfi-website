/**
 * Safely parses an input date string into a consistent ISO YYYY-MM-DD format.
 * Optimized for strict Cloudflare Edge/V8 runtimes to prevent local timezone rendering drift.
 */
export function formatEdgeDate(dateInput: string | undefined | null): string {
  if (!dateInput) return 'No Date'

  try {
    const parsedDate = new Date(dateInput)

    // Check for invalid dates (e.g. broken CMS input)
    if (isNaN(parsedDate.getTime())) {
      return 'No Date'
    }

    const [year, month, day] = parsedDate
      .toISOString()
      .split('T')[0]
      .split('-')
      .map(Number)
    return new Date(year, month - 1, day)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      .toUpperCase()
  } catch {
    return 'No Date'
  }
}
