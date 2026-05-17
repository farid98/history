'use client'

import React from 'react'

export type ZoomLevel = 'millennium' | '500-year' | 'century'

interface ZoomControlsProps {
  activeLevel: ZoomLevel
  onLevelChange: (level: ZoomLevel) => void
}

const levels: { id: ZoomLevel; label: string; description: string }[] = [
  { id: 'millennium', label: '1000 yr', description: 'Millennial view' },
  { id: '500-year', label: '500 yr', description: '500-year spans' },
  { id: 'century', label: '100 yr', description: 'Century view' },
]

export default function ZoomControls({ activeLevel, onLevelChange }: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-1 bg-white border border-[#E8E0D5] rounded-lg p-1 shadow-sm">
      <span className="text-xs font-sans text-[#888] px-2 hidden sm:block select-none">
        Zoom
      </span>
      {levels.map((level) => {
        const isActive = level.id === activeLevel
        return (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            title={level.description}
            className={[
              'px-4 py-1.5 rounded-md text-sm font-sans font-medium transition-all duration-200 select-none',
              isActive
                ? 'bg-[#2C2C2C] text-white shadow-sm'
                : 'text-[#555] hover:bg-[#F5EFE8] hover:text-[#2C2C2C]',
            ].join(' ')}
          >
            {level.label}
          </button>
        )
      })}
    </div>
  )
}
