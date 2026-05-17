import { NextRequest, NextResponse } from 'next/server'
import { getPeriodBySlug } from '@/lib/timeline'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ level: string; slug: string }> }
) {
  const { level, slug } = await params

  if (!level || !slug) {
    return NextResponse.json({ error: 'Missing level or slug' }, { status: 400 })
  }

  try {
    const period = getPeriodBySlug(level, slug)

    if (!period) {
      return NextResponse.json(
        { error: `Period "${slug}" not found at level "${level}"` },
        { status: 404 }
      )
    }

    return NextResponse.json(period, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error(`Error loading period "${slug}" at level "${level}":`, err)
    return NextResponse.json({ error: 'Failed to load period data' }, { status: 500 })
  }
}
