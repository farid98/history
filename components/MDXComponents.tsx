import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import React from 'react'

interface EventCardProps {
  year: string
  title: string
  children?: React.ReactNode
}

function EventCard({ year, title, children }: EventCardProps) {
  return (
    <div className="my-4 border-l-4 border-[#8B7355] pl-4 py-2 bg-[#FAF8F5] rounded-r-md">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#8B7355] font-sans">
          {year}
        </span>
        <span className="font-semibold text-[#2C2C2C] font-serif">{title}</span>
      </div>
      {children && (
        <div className="text-sm text-[#555] font-serif leading-relaxed">{children}</div>
      )}
    </div>
  )
}

export const MDXComponents: MDXComponentsType = {
  EventCard,

  h1: (props) => (
    <h1
      className="font-serif text-2xl font-bold text-[#2C2C2C] mt-8 mb-4 pb-2 border-b border-[#E8E0D5]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-serif text-xl font-bold text-[#2C2C2C] mt-6 mb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-serif text-lg font-semibold text-[#444] mt-5 mb-2"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="font-serif text-[15px] text-[#2C2C2C] leading-relaxed mb-4"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-none pl-0 mb-4 space-y-2"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-5 mb-4 space-y-2 font-serif text-[15px] text-[#2C2C2C]"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="font-serif text-[15px] text-[#2C2C2C] leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-[#8B7355] before:text-xs before:top-1"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-[#2C2C2C]" {...props} />
  ),
  em: (props) => (
    <em className="italic text-[#444]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-[#8B7355] pl-4 py-1 my-4 italic text-[#555] font-serif text-[15px] bg-[#FAF8F5]"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-none border-t border-[#E8E0D5] my-6" />
  ),
  a: (props) => (
    <a
      className="text-[#2C4A7C] underline underline-offset-2 hover:text-[#8B7355] transition-colors"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-[#F0EBE3] px-1.5 py-0.5 rounded text-sm font-mono text-[#2C2C2C]"
      {...props}
    />
  ),
}
