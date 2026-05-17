'use client'

import React, { useEffect, useCallback } from 'react'
import type { TimelinePeriod, Civilization, ScienceInvention, Philosophy } from '@/lib/timeline'
import { formatYearRange } from '@/lib/format'
import MDXContent from './MDXContent'

interface PeriodDetailProps {
  period: TimelinePeriod & { content: string }
  onClose: () => void
}

function PhilosophyBlock({ items }: { items: Philosophy[] }) {
  return (
    <div className="mb-8 pb-6 border-b border-[#E8E0D5]">
      <h3 className="text-[10px] font-sans font-semibold tracking-widest uppercase mb-3 text-[#5B4A8A]">
        Philosophy &amp; Thought
      </h3>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-[#DDD5F0] bg-[#F8F6FC] p-3">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-1 rounded-full self-stretch bg-[#5B4A8A] opacity-60" />
              <div>
                <p className="text-[13px] font-sans font-semibold text-[#2C2C2C]">{item.name}</p>
                <p className="text-[12px] font-sans text-[#5B4A8A] font-medium mt-0.5">{item.summary}</p>
                <p className="text-[12px] font-serif text-[#555] leading-relaxed mt-1.5">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScienceBlock({ items }: { items: ScienceInvention[] }) {
  return (
    <div className="mb-8 pb-6 border-b border-[#E8E0D5]">
      <h3 className="text-[10px] font-sans font-semibold tracking-widest uppercase mb-3 text-[#2C4A7C]">
        Science &amp; Inventions
      </h3>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-[#D4E0F0] bg-[#F4F7FB] p-3">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-1 rounded-full self-stretch bg-[#2C4A7C] opacity-60" />
              <div>
                <p className="text-[13px] font-sans font-semibold text-[#2C2C2C]">{item.name}</p>
                <p className="text-[12px] font-sans text-[#2C4A7C] font-medium mt-0.5">{item.summary}</p>
                <p className="text-[12px] font-serif text-[#555] leading-relaxed mt-1.5">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CivilizationsBlock({ civilizations, color }: { civilizations: Civilization[]; color: string }) {
  return (
    <div className="mb-8 pb-6 border-b border-[#E8E0D5]">
      <h3
        className="text-[10px] font-sans font-semibold tracking-widest uppercase mb-3"
        style={{ color }}
      >
        Civilizations of This Period
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {civilizations.map((civ, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-md bg-[#FAF8F5] border border-[#E8E0D5]"
          >
            <div
              className="flex-shrink-0 w-1 rounded-full self-stretch"
              style={{ backgroundColor: color }}
            />
            <div>
              <p className="text-[13px] font-sans font-semibold text-[#2C2C2C]">{civ.name}</p>
              <p className="text-[12px] font-serif text-[#666] leading-relaxed mt-0.5">{civ.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PeriodDetail({ period, onClose }: PeriodDetailProps) {
  const yearRange = formatYearRange(period)

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [handleEsc])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 bg-white shadow-[-4px_0_32px_rgba(44,44,44,0.12)] flex flex-col w-full sm:w-[480px] animate-slide-in"
        role="dialog"
        aria-modal="true"
        aria-label={period.title}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-[#E8E0D5]"
          style={{ borderLeftColor: period.color, borderLeftWidth: '4px' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Era badge */}
              <span
                className="inline-block text-[10px] font-sans font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full mb-2"
                style={{
                  backgroundColor: `${period.color}22`,
                  color: period.color,
                }}
              >
                {period.era}
              </span>

              <h2 className="font-serif text-xl font-bold text-[#2C2C2C] leading-snug mb-1">
                {period.title}
              </h2>

              <p className="text-sm font-sans text-[#8B7355] font-semibold tracking-wide">
                {yearRange}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[#888] hover:bg-[#F5EFE8] hover:text-[#2C2C2C] transition-colors mt-0.5"
              aria-label="Close panel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Summary */}
          <p className="mt-3 text-sm font-serif text-[#555] leading-relaxed">
            {period.summary}
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {period.civilizations && period.civilizations.length > 0 && (
            <CivilizationsBlock civilizations={period.civilizations} color={period.color} />
          )}
          {period.scienceAndInventions && period.scienceAndInventions.length > 0 && (
            <ScienceBlock items={period.scienceAndInventions} />
          )}
          {period.philosophy && period.philosophy.length > 0 && (
            <PhilosophyBlock items={period.philosophy} />
          )}
          <MDXContent content={period.content} />
        </div>
      </aside>
    </>
  )
}
