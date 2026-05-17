import { NextRequest, NextResponse } from 'next/server'
import { getPeriodsByLevel } from '@/lib/timeline'

type Level = 'millennium' | '500-year' | 'century'
const VALID_LEVELS: Level[] = ['millennium', '500-year', 'century']

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ level: string }> }
) {
  const { level } = await params

  if (!VALID_LEVELS.includes(level as Level)) {
    return NextResponse.json(
      { error: `Invalid level "${level}". Must be one of: ${VALID_LEVELS.join(', ')}` },
      { status: 400 }
    )
  }

  try {
    const periods = getPeriodsByLevel(level as Level)

    return NextResponse.json(periods, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error(`Error loading periods for level "${level}":`, err)
    return NextResponse.json({ error: 'Failed to load timeline data' }, { status: 500 })
  }
}
