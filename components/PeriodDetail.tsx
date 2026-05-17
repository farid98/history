'use client'

import React, { useEffect, useCallback, useState } from 'react'
import type { TimelinePeriod, Civilization, ScienceInvention, Philosophy, ArtArchitecture, WarConflict, TradeEconomy } from '@/lib/timeline'
import { formatYearRange } from '@/lib/format'
import MDXContent from './MDXContent'

interface PeriodDetailProps {
  period: TimelinePeriod & { content: string }
  onClose: () => void
}

interface DetailItem {
  name: string
  summary: string
  detail: string
}

interface CollapsibleSectionProps {
  label: string
  accentColor: string
  borderColor: string
  bgColor: string
  items: DetailItem[]
}

function CollapsibleSection({ label, accentColor, borderColor, bgColor, items }: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const allExpanded = expanded.size === items.length
  const anyExpanded = expanded.size > 0

  function toggleItem(i: number) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  function toggleAll() {
    setExpanded(allExpanded ? new Set() : new Set(items.map((_, i) => i)))
  }

  return (
    <div className="mb-8 pb-6 border-b border-[#E8E0D5]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] font-sans font-semibold tracking-widest uppercase" style={{ color: accentColor }}>
          {label}
        </h3>
        <button
          onClick={toggleAll}
          className="text-[10px] font-sans font-medium tracking-wide hover:opacity-80 transition-opacity"
          style={{ color: accentColor }}
        >
          {allExpanded ? 'Collapse all' : anyExpanded ? 'Expand all' : 'Expand all'}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => {
          const open = expanded.has(i)
          return (
            <button
              key={i}
              onClick={() => toggleItem(i)}
              className="rounded-md border text-left w-full transition-colors"
              style={{ borderColor, backgroundColor: bgColor }}
            >
              <div className="flex items-start gap-2 p-3">
                <div
                  className="flex-shrink-0 w-1 rounded-full self-stretch opacity-60"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-sans font-semibold text-[#2C2C2C]">{item.name}</p>
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 transition-transform duration-200"
                      style={{ color: accentColor, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-[12px] font-sans font-medium mt-0.5" style={{ color: accentColor }}>
                    {item.summary}
                  </p>
                  {open && (
                    <p className="text-[12px] font-serif text-[#555] leading-relaxed mt-2 border-t pt-2" style={{ borderColor }}>
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PhilosophyBlock({ items }: { items: Philosophy[] }) {
  return (
    <CollapsibleSection
      label="Philosophy & Thought"
      accentColor="#5B4A8A"
      borderColor="#DDD5F0"
      bgColor="#F8F6FC"
      items={items}
    />
  )
}

function ScienceBlock({ items }: { items: ScienceInvention[] }) {
  return (
    <CollapsibleSection
      label="Science & Inventions"
      accentColor="#2C4A7C"
      borderColor="#D4E0F0"
      bgColor="#F4F7FB"
      items={items}
    />
  )
}

function ArtArchitectureBlock({ items }: { items: ArtArchitecture[] }) {
  return (
    <CollapsibleSection
      label="Art & Architecture"
      accentColor="#9C5A1D"
      borderColor="#F0DCC8"
      bgColor="#FDF7F2"
      items={items}
    />
  )
}

function WarConflictBlock({ items }: { items: WarConflict[] }) {
  return (
    <CollapsibleSection
      label="War & Conflict"
      accentColor="#8B2222"
      borderColor="#EDD0D0"
      bgColor="#FDF4F4"
      items={items}
    />
  )
}

function TradeEconomyBlock({ items }: { items: TradeEconomy[] }) {
  return (
    <CollapsibleSection
      label="Trade & Economy"
      accentColor="#2D6A4F"
      borderColor="#C8E6D8"
      bgColor="#F2FAF6"
      items={items}
    />
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
          {period.warAndConflict && period.warAndConflict.length > 0 && (
            <WarConflictBlock items={period.warAndConflict} />
          )}
          {period.tradeAndEconomy && period.tradeAndEconomy.length > 0 && (
            <TradeEconomyBlock items={period.tradeAndEconomy} />
          )}
          {period.artAndArchitecture && period.artAndArchitecture.length > 0 && (
            <ArtArchitectureBlock items={period.artAndArchitecture} />
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
