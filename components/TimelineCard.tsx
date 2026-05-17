'use client'

import React, { useState, useEffect } from 'react'
import type { TimelinePeriod } from '@/lib/timeline'
import { formatYearRange } from '@/lib/format'

interface TimelineCardProps {
  period: TimelinePeriod
  onClick: () => void
  expandKeyEvents?: boolean
  expandCivilizations?: boolean
  expandScience?: boolean
  expandPhilosophy?: boolean
}

function ImportanceDots({ importance }: { importance: number }) {
  return (
    <div className="flex gap-1 items-center" aria-label={`Importance: ${importance} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={[
            'w-1.5 h-1.5 rounded-full transition-colors',
            i < importance ? 'bg-[#8B7355]' : 'bg-[#E8E0D5]',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

interface CardSectionProps {
  title: string
  color: string
  externalOpen?: boolean
  children: React.ReactNode
}

function CardSection({ title, color, externalOpen, children }: CardSectionProps) {
  const [open, setOpen] = useState(externalOpen ?? false)

  useEffect(() => {
    if (externalOpen !== undefined) setOpen(externalOpen)
  }, [externalOpen])

  return (
    <div className="border-t border-[#F0EAE2] pt-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className="flex items-center justify-between w-full text-left gap-2"
        aria-expanded={open}
      >
        <span
          className="text-[10px] font-sans font-semibold tracking-widest uppercase"
          style={{ color }}
        >
          {title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3 h-3 text-[#bbb] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default function TimelineCard({ period, onClick, expandKeyEvents, expandCivilizations, expandScience, expandPhilosophy }: TimelineCardProps) {
  const yearRange = formatYearRange(period)
  const hasKeyEvents = period.keyEvents && period.keyEvents.length > 0
  const hasCivilizations = period.civilizations && period.civilizations.length > 0
  const hasScience = period.scienceAndInventions && period.scienceAndInventions.length > 0
  const hasPhilosophy = period.philosophy && period.philosophy.length > 0

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className="group relative flex flex-col text-left bg-white border border-[#E8E0D5] rounded-lg shadow-[0_2px_8px_rgba(44,44,44,0.08)] hover:shadow-[0_8px_24px_rgba(44,44,44,0.16)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C4A7C] focus-visible:ring-offset-2"
      style={{ minWidth: '240px', maxWidth: '280px', width: '260px' }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
        style={{ backgroundColor: period.color }}
      />

      <div className="pl-5 pr-4 py-4 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-sans font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${period.color}22`, color: period.color }}
          >
            {period.era}
          </span>
          <ImportanceDots importance={period.importance} />
        </div>

        <h3 className="font-serif text-[15px] font-bold text-[#2C2C2C] leading-snug line-clamp-2">
          {period.title}
        </h3>

        <p className="text-xs font-sans text-[#8B7355] font-semibold tracking-wide">
          {yearRange}
        </p>

        <p className="text-[13px] font-serif text-[#555] leading-relaxed">
          {period.summary}
        </p>

        {hasKeyEvents && (
          <CardSection title="Key Events" color={period.color} externalOpen={expandKeyEvents}>
            <ul className="flex flex-col gap-1.5">
              {period.keyEvents!.map((ev, i) => (
                <li key={i} className="text-[12px] font-sans text-[#444] leading-snug">
                  {ev.date && <span className="font-semibold text-[#2C2C2C]">{ev.date}: </span>}
                  {ev.event}
                </li>
              ))}
            </ul>
          </CardSection>
        )}

        {hasCivilizations && (
          <CardSection title="Civilizations" color={period.color} externalOpen={expandCivilizations}>
            <ul className="flex flex-col gap-2">
              {period.civilizations!.map((civ, i) => (
                <li key={i}>
                  <span className="text-[12px] font-sans font-semibold text-[#2C2C2C]">{civ.name}</span>
                  <p className="text-[11px] font-sans text-[#666] leading-snug mt-0.5">{civ.summary}</p>
                </li>
              ))}
            </ul>
          </CardSection>
        )}

        {hasScience && (
          <CardSection title="Science & Inventions" color="#2C4A7C" externalOpen={expandScience}>
            <ul className="flex flex-col gap-1.5">
              {period.scienceAndInventions!.map((item, i) => (
                <li key={i} className="text-[12px] font-sans text-[#444] leading-snug">
                  <span className="font-semibold text-[#2C2C2C]">{item.name}: </span>
                  {item.summary}
                </li>
              ))}
            </ul>
          </CardSection>
        )}

        {hasPhilosophy && (
          <CardSection title="Philosophy & Thought" color="#5B4A8A" externalOpen={expandPhilosophy}>
            <ul className="flex flex-col gap-1.5">
              {period.philosophy!.map((item, i) => (
                <li key={i} className="text-[12px] font-sans text-[#444] leading-snug">
                  <span className="font-semibold text-[#2C2C2C]">{item.name}: </span>
                  {item.summary}
                </li>
              ))}
            </ul>
          </CardSection>
        )}

        <div className="mt-auto pt-1 flex items-center gap-1 text-[11px] font-sans text-[#888] group-hover:text-[#2C2C2C] transition-colors">
          <span>Explore full account</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
