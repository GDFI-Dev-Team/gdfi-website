// Soft categorical palette for community-story and program category badges.
// Categories come from the CMS and are open-ended, but we don't expect more than
// ~20 distinct ones — each gets a stable colour from this list (opaque pills, so
// they read the same in light and dark themes).
const CATEGORY_COLORS: { bg: string; text: string }[] = [
  { bg: '#E8F0FE', text: '#1A56DB' }, // blue
  { bg: '#E6F4EA', text: '#137333' }, // green
  { bg: '#FEF3E0', text: '#B25E09' }, // amber
  { bg: '#FCE8E8', text: '#C5221F' }, // rose
  { bg: '#F3E8FD', text: '#7E22CE' }, // purple
  { bg: '#E0F2F1', text: '#0F766E' }, // teal
  { bg: '#FCE7F3', text: '#BE185D' }, // pink
  { bg: '#E8EAFD', text: '#4338CA' }, // indigo
  { bg: '#FEECDC', text: '#C2410C' }, // orange
  { bg: '#E0F7FA', text: '#0E7490' }, // cyan
  { bg: '#ECFCCB', text: '#4D7C0F' }, // lime
  { bg: '#D1FAE5', text: '#047857' }, // emerald
  { bg: '#E0F2FE', text: '#0369A1' }, // sky
  { bg: '#EDE9FE', text: '#6D28D9' }, // violet
  { bg: '#FAE8FF', text: '#A21CAF' }, // fuchsia
  { bg: '#FEE2E2', text: '#B91C1C' }, // red
  { bg: '#FEF9C3', text: '#A16207' }, // yellow
  { bg: '#E2E8F0', text: '#475569' }, // slate
  { bg: '#F5E8D8', text: '#92400E' }, // brown
  { bg: '#FFE4E6', text: '#9F1239' }, // maroon
]

// Stable per-name hash so a given category keeps the same colour across cards
// and renders, regardless of the order tags appear in.
export function categoryColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length]
}
