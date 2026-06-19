/**
 * Slices an array of items for the active page and calculates the total pages.
 */
export function paginateItems<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number,
) {
  const totalPages = Math.ceil(items.length / itemsPerPage)

  // Safe bounds check
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1))

  const startIndex = (safePage - 1) * itemsPerPage
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage)

  return {
    items: paginatedItems,
    totalPages,
  }
}
