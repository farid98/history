'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import type { TimelinePeriod } from '@/lib/timeline'
import TimelineCard from './TimelineCard'
import PeriodDetail from './PeriodDetail'

function ToggleButton({
  label,
  active,
  color,
  onClick,
}: {
  label: string
  active: boolean
  color: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-sans font-semibold border transition-all duration-150"
      style={
        active
          ? { backgroundColor: color, borderColor: color, color: '#fff' }
          : { backgroundColor: 'white', borderColor: '#E8E0D5', color: '#555' }
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        {active ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        )}
      </svg>
      {label}
    </button>
  )
}

export default function TimelineExplorer() {
  const [periods, setPeriods] = useState<TimelinePeriod[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<
    (TimelinePeriod & { content: string }) | null
  >(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [expandKeyEvents, setExpandKeyEvents] = useState(false)
  const [expandCivilizations, setExpandCivilizations] = useState(false)
  const [expandScience, setExpandScience] = useState(false)
  const [expandPhilosophy, setExpandPhilosophy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchPeriods = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/timeline/millennium')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: TimelinePeriod[] = await res.json()
      setPeriods(data)
    } catch (err) {
      console.error('Failed to fetch periods:', err)
      setPeriods([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPeriods()
  }, [fetchPeriods])

  const handleCardClick = async (period: TimelinePeriod) => {
    setDetailLoading(true)
    try {
      const res = await fetch(`/api/timeline/${period.level}/${period.slug}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json() as TimelinePeriod & { content: string }
      setSelectedPeriod(data)
    } catch (err) {
      console.error('Failed to fetch period detail:', err)
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Controls bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-sans text-[#aaa] tracking-wide uppercase">Expand all</span>
        <ToggleButton
          label="Key Events"
          active={expandKeyEvents}
          color="#8B7355"
          onClick={() => setExpandKeyEvents((v) => !v)}
        />
        <ToggleButton
          label="Civilizations"
          active={expandCivilizations}
          color="#4A6741"
          onClick={() => setExpandCivilizations((v) => !v)}
        />
        <ToggleButton
          label="Science & Inventions"
          active={expandScience}
          color="#2C4A7C"
          onClick={() => setExpandScience((v) => !v)}
        />
        <ToggleButton
          label="Philosophy"
          active={expandPhilosophy}
          color="#5B4A8A"
          onClick={() => setExpandPhilosophy((v) => !v)}
        />
        {!loading && (
          <span className="ml-auto text-xs font-sans text-[#bbb]">
            {periods.length} periods · 1,000-year spans
          </span>
        )}
      </div>

      {/* Timeline scroll area */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10" />

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-4 px-2"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#E8E0D5 transparent' }}
        >
          {loading ? (
            <div className="flex gap-4 py-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 rounded-lg bg-white border border-[#E8E0D5] animate-pulse"
                  style={{ width: '260px', height: '180px' }}
                />
              ))}
            </div>
          ) : periods.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-[#888] font-serif">
              No periods found.
            </div>
          ) : (
            <div className="flex gap-4 py-2">
              {periods.map((period) => (
                <div key={period.id} className="flex-shrink-0">
                  <TimelineCard
                    period={period}
                    onClick={() => handleCardClick(period)}
                    expandKeyEvents={expandKeyEvents}
                    expandCivilizations={expandCivilizations}
                    expandScience={expandScience}
                    expandPhilosophy={expandPhilosophy}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {detailLoading && (
        <div className="fixed inset-0 bg-black/10 z-30 flex items-center justify-center pointer-events-none">
          <div className="bg-white border border-[#E8E0D5] rounded-lg px-4 py-2 shadow-md text-sm font-sans text-[#555]">
            Loading…
          </div>
        </div>
      )}

      {selectedPeriod && (
        <PeriodDetail
          period={selectedPeriod}
          onClose={() => setSelectedPeriod(null)}
        />
      )}
    </div>
  )
}
