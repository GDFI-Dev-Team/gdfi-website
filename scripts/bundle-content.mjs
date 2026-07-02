#!/usr/bin/env node
/**
 * Pre-build script: reads all markdown from content/ and generates
 * src/lib/content/_bundled-content.ts so the Worker runtime can access
 * content without `fs` (not available in Cloudflare Workers V8).
 *
 * Also bundles public SVG assets that are inlined by server components
 * (e.g. the core-pillar icons) into src/features/home/components/_bundled-icons.ts.
 *
 * Runs automatically before `next build` / `next dev`.
 * Re-run manually with `pnpm bundle-content` after editing content in dev.
 */

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONTENT_DIR = join(ROOT, 'content')
const OUTPUT = join(ROOT, 'src/lib/content/_bundled-content.ts')
const ICONS_OUTPUT = join(
  ROOT,
  'src/features/home/components/_bundled-icons.ts',
)

// ── Markdown content ────────────────────────────────────────────────────────

function scanDir(subpath) {
  const dir = join(CONTENT_DIR, subpath)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const raw = readFileSync(join(dir, fileName), 'utf8')
      const { data, content } = matter(raw)
      return { slug, ...data, body: content }
    })
}

function walkDirs(base = '', acc = {}) {
  const dir = join(CONTENT_DIR, base)
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const sub = base ? `${base}/${entry.name}` : entry.name
    const items = scanDir(sub)
    if (items.length) acc[sub] = items
    walkDirs(sub, acc)
  }
  return acc
}

const contentMap = walkDirs()
const folderCount = Object.keys(contentMap).length
const fileCount = Object.values(contentMap).reduce((n, arr) => n + arr.length, 0)

writeFileSync(
  OUTPUT,
  `\
// GENERATED — do not edit manually.
// Regenerated automatically before \`next build\` / \`next dev\`.
// Run \`pnpm bundle-content\` to refresh after adding content in dev.
// prettier-ignore
export const contentMap: Record<string, Array<Record<string, unknown>>> = ${JSON.stringify(contentMap, null, 2)}
`,
  'utf8',
)
console.log(
  `bundled ${fileCount} files across ${folderCount} folders → src/lib/content/_bundled-content.ts`,
)

// ── SVG icons ───────────────────────────────────────────────────────────────
// Core-pillar SVGs are inlined by server components for theme-aware coloring.
// They can't be read with `fs` at Worker runtime, so we bundle them here.

const ICONS_DIR = join(ROOT, 'public', 'our-core-pillars')

function transformSvg(raw) {
  return raw
    .replaceAll('fill="#ffffff"', 'fill="none"')
    .replaceAll('#142d44', 'currentColor')
}

const icons = {}
if (existsSync(ICONS_DIR)) {
  for (const file of readdirSync(ICONS_DIR).filter((f) => f.endsWith('.svg')).sort()) {
    const stem = file.replace(/\.svg$/, '')
    icons[stem] = transformSvg(readFileSync(join(ICONS_DIR, file), 'utf8'))
  }
}

writeFileSync(
  ICONS_OUTPUT,
  `\
// GENERATED — do not edit manually.
// Regenerated automatically before \`next build\` / \`next dev\`.
// Run \`pnpm bundle-content\` to refresh after editing public/our-core-pillars/*.svg
// prettier-ignore
export const pillarsIcons: Record<number, string> = ${JSON.stringify(icons, null, 2)}
`,
  'utf8',
)
console.log(
  `bundled ${Object.keys(icons).length} pillar icons → src/features/home/components/_bundled-icons.ts`,
)
