'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { geographyData, REGIONS } from '@/lib/geography'
import type { HistoricalPlace } from '@/lib/geography'

function PlaceCard({ place }: { place: HistoricalPlace }) {
  return (
    <div className="bg-white border border-[#E8E0D5] rounded-lg p-4 shadow-[0_2px_8px_rgba(44,44,44,0.06)] hover:shadow-[0_4px_16px_rgba(44,44,44,0.12)] transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-serif text-[15px] font-bold text-[#2C2C2C] leading-snug">
          {place.historicalName}
        </h3>
        <span className="flex-shrink-0 text-[10px] font-sans font-semibold text-[#888] bg-[#F5EFE8] px-2 py-0.5 rounded-full whitespace-nowrap">
          {place.period}
        </span>
      </div>

      <p className="text-[12px] font-serif text-[#666] leading-relaxed mb-3">
        {place.description}
      </p>

      <div className="border-t border-[#F0EAE2] pt-3">
        <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#8B7355] mb-1">
          Today
        </p>
        <p className="text-[13px] font-sans font-medium text-[#2C2C2C]">
          {place.modernEquivalent}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {place.modernCountries.map((country) => (
            <span
              key={country}
              className="text-[10px] font-sans text-[#555] bg-[#F5F5F2] border border-[#E8E0D5] px-1.5 py-0.5 rounded"
            >
              {country}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GeographyPage() {
  const [search, setSearch] = useState('')
  const [activeRegion, setActiveRegion] = useState<string>('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return geographyData.filter((place) => {
      const matchesRegion = activeRegion === 'All' || place.region === activeRegion
      if (!matchesRegion) return false
      if (!q) return true
      return (
        place.historicalName.toLowerCase().includes(q) ||
        place.modernEquivalent.toLowerCase().includes(q) ||
        place.modernCountries.some((c) => c.toLowerCase().includes(q)) ||
        place.description.toLowerCase().includes(q)
      )
    })
  }, [search, activeRegion])

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: geographyData.length }
    for (const place of geographyData) {
      counts[place.region] = (counts[place.region] ?? 0) + 1
    }
    return counts
  }, [])

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="border-b border-[#E8E0D5] bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#8B7355] hover:text-[#2C2C2C] transition-colors text-sm font-sans font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Timeline
          </Link>
          <div className="w-px h-5 bg-[#E8E0D5]" />
          <div>
            <h1 className="font-serif text-xl font-bold text-[#2C2C2C] leading-tight">
              Historical Place Names
            </h1>
            <p className="text-xs font-sans text-[#888] mt-0.5">
              Ancient & historical regions mapped to their modern equivalents
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by historical name, modern country…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E8E0D5] bg-white text-[13px] font-sans text-[#2C2C2C] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Region filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['All', ...REGIONS] as string[]).map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-sans font-semibold border transition-all duration-150"
              style={
                activeRegion === region
                  ? { backgroundColor: '#8B7355', borderColor: '#8B7355', color: '#fff' }
                  : { backgroundColor: 'white', borderColor: '#E8E0D5', color: '#555' }
              }
            >
              {region}
              <span className={`text-[10px] ${activeRegion === region ? 'opacity-80' : 'text-[#aaa]'}`}>
                {regionCounts[region] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs font-sans text-[#aaa] mb-4">
          {filtered.length} {filtered.length === 1 ? 'place' : 'places'}
          {search ? ` matching "${search}"` : ''}
          {activeRegion !== 'All' ? ` in ${activeRegion}` : ''}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 font-serif text-[#888]">
            No places found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((place) => (
              <PlaceCard key={`${place.historicalName}-${place.period}`} place={place} />
            ))}
          </div>
        )}
      </div>

      <footer className="mt-16 border-t border-[#E8E0D5] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-sans text-[#aaa] text-center">
            Historical Timeline &copy; {new Date().getFullYear()} &nbsp;·&nbsp;
            Geographical boundaries are approximations — ancient regions rarely map cleanly onto modern states
          </p>
        </div>
      </footer>
    </main>
  )
}
