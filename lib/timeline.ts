import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface KeyEvent {
  date: string
  event: string
}

export interface Civilization {
  name: string
  summary: string
}

export interface ScienceInvention {
  name: string
  summary: string
  detail: string
}

export interface Philosophy {
  name: string
  summary: string
  detail: string
}

export interface ArtArchitecture {
  name: string
  summary: string
  detail: string
}

export interface WarConflict {
  name: string
  summary: string
  detail: string
}

export interface TradeEconomy {
  name: string
  summary: string
  detail: string
}

export interface TimelinePeriod {
  id: string
  slug: string
  startYear: number // negative = BCE (e.g. -4000 = 4000 BCE)
  endYear: number
  startYearLabel: string // "BCE" or "CE"
  endYearLabel: string
  level: 'millennium' | '500-year' | 'century'
  title: string
  summary: string
  color: string
  importance: number // 1-5
  era: string
  keyEvents?: KeyEvent[]
  civilizations?: Civilization[]
  scienceAndInventions?: ScienceInvention[]
  philosophy?: Philosophy[]
  artAndArchitecture?: ArtArchitecture[]
  warAndConflict?: WarConflict[]
  tradeAndEconomy?: TradeEconomy[]
  relatedPeriods?: { slug: string; level: string; title: string }[]
  content?: string
}

function parseKeyEvents(content: string): KeyEvent[] {
  const sectionMatch = content.match(/## Key Events\n\n([\s\S]*?)(?=\n## |\n# |$)/)
  if (!sectionMatch) return []
  return sectionMatch[1]
    .split('\n')
    .filter((l) => l.startsWith('- '))
    .map((line) => {
      const m = line.match(/^-\s+\*\*([^*]+)\*\*:\s*(.+)$/)
      if (m) return { date: m[1].trim(), event: m[2].trim() }
      return { date: '', event: line.replace(/^-\s+/, '').replace(/\*\*/g, '').trim() }
    })
    .filter((e) => e.event)
}

const levelToFolder: Record<string, string> = {
  millennium: 'millennia',
  '500-year': '500-year',
  century: 'centuries',
}

function getContentDir(level: string): string {
  const folder = levelToFolder[level] ?? level
  return path.join(process.cwd(), 'content', 'timeline', folder)
}

export function getPeriodsByLevel(
  level: 'millennium' | '500-year' | 'century'
): TimelinePeriod[] {
  const dir = getContentDir(level)

  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  const periods: TimelinePeriod[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const fullPath = path.join(dir, filename)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(raw)

    return {
      id: `${level}-${slug}`,
      slug,
      startYear: data.startYear as number,
      endYear: data.endYear as number,
      startYearLabel: (data.startYearLabel as string) ?? 'BCE',
      endYearLabel: (data.endYearLabel as string) ?? 'CE',
      level: data.level as TimelinePeriod['level'],
      title: data.title as string,
      summary: data.summary as string,
      color: (data.color as string) ?? '#8B7355',
      importance: (data.importance as number) ?? 1,
      era: (data.era as string) ?? '',
      keyEvents: parseKeyEvents(content),
      civilizations: (data.civilizations as Civilization[]) ?? [],
      scienceAndInventions: (data.scienceAndInventions as ScienceInvention[]) ?? [],
      philosophy: (data.philosophy as Philosophy[]) ?? [],
      artAndArchitecture: (data.artAndArchitecture as ArtArchitecture[]) ?? [],
      warAndConflict: (data.warAndConflict as WarConflict[]) ?? [],
      tradeAndEconomy: (data.tradeAndEconomy as TradeEconomy[]) ?? [],
      relatedPeriods: (data.relatedPeriods as TimelinePeriod['relatedPeriods']) ?? [],
    }
  })

  // Sort chronologically (most ancient first)
  periods.sort((a, b) => a.startYear - b.startYear)

  return periods
}

export function getPeriodBySlug(
  level: string,
  slug: string
): (TimelinePeriod & { content: string }) | null {
  const dir = getContentDir(level)
  const fullPath = path.join(dir, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return {
    id: `${level}-${slug}`,
    slug,
    startYear: data.startYear as number,
    endYear: data.endYear as number,
    startYearLabel: (data.startYearLabel as string) ?? 'BCE',
    endYearLabel: (data.endYearLabel as string) ?? 'CE',
    level: data.level as TimelinePeriod['level'],
    title: data.title as string,
    summary: data.summary as string,
    color: (data.color as string) ?? '#8B7355',
    importance: (data.importance as number) ?? 1,
    era: (data.era as string) ?? '',
    civilizations: (data.civilizations as Civilization[]) ?? [],
    scienceAndInventions: (data.scienceAndInventions as ScienceInvention[]) ?? [],
    philosophy: (data.philosophy as Philosophy[]) ?? [],
    artAndArchitecture: (data.artAndArchitecture as ArtArchitecture[]) ?? [],
    warAndConflict: (data.warAndConflict as WarConflict[]) ?? [],
    tradeAndEconomy: (data.tradeAndEconomy as TradeEconomy[]) ?? [],
    relatedPeriods: (data.relatedPeriods as TimelinePeriod['relatedPeriods']) ?? [],
    content,
  }
}

export { formatYearRange } from './format'
