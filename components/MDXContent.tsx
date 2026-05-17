// This is intentionally a client-safe wrapper.
// We render MDX server-side via a dedicated route, but for the sidebar
// we display the raw markdown as richly-styled HTML via a simple renderer.
// next-mdx-remote/rsc only works in React Server Components; PeriodDetail
// is a Client Component that receives already-fetched content string.
// We therefore render the markdown with a lightweight approach here.

'use client'

import React from 'react'

interface MDXContentProps {
  content: string
}

// Lightweight markdown-to-JSX renderer for client components.
// Handles headings, bold, italic, lists, blockquotes, EventCard-style syntax,
// horizontal rules, and paragraphs.
export default function MDXContent({ content }: MDXContentProps) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let keyCount = 0

  const key = () => `mdx-${keyCount++}`

  // Inline formatting: **bold**, *italic*, `code`
  function parseInline(text: string): React.ReactNode {
    const parts: React.ReactNode[] = []
    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
    let last = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) {
        parts.push(text.slice(last, match.index))
      }
      if (match[2]) {
        parts.push(<strong key={key()} className="font-semibold text-[#2C2C2C]">{match[2]}</strong>)
      } else if (match[3]) {
        parts.push(<em key={key()} className="italic text-[#444]">{match[3]}</em>)
      } else if (match[4]) {
        parts.push(
          <code key={key()} className="bg-[#F0EBE3] px-1.5 py-0.5 rounded text-sm font-mono text-[#2C2C2C]">
            {match[4]}
          </code>
        )
      }
      last = match.index + match[0].length
    }

    if (last < text.length) {
      parts.push(text.slice(last))
    }

    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>
  }

  while (i < lines.length) {
    const line = lines[i]

    // Skip blank lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={key()} className="border-t border-[#E8E0D5] my-6" />)
      i++
      continue
    }

    // Headings
    const hMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (hMatch) {
      const level = hMatch[1].length
      const text = hMatch[2]
      if (level === 1) {
        elements.push(
          <h2 key={key()} className="font-serif text-xl font-bold text-[#2C2C2C] mt-8 mb-4 pb-2 border-b border-[#E8E0D5]">
            {parseInline(text)}
          </h2>
        )
      } else if (level === 2) {
        elements.push(
          <h3 key={key()} className="font-serif text-lg font-bold text-[#2C2C2C] mt-6 mb-3">
            {parseInline(text)}
          </h3>
        )
      } else {
        elements.push(
          <h4 key={key()} className="font-serif text-base font-semibold text-[#444] mt-5 mb-2">
            {parseInline(text)}
          </h4>
        )
      }
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <blockquote key={key()} className="border-l-4 border-[#8B7355] pl-4 py-1 my-4 italic text-[#555] font-serif text-[15px] bg-[#FAF8F5]">
          {quoteLines.map((l, idx) => (
            <p key={idx}>{parseInline(l)}</p>
          ))}
        </blockquote>
      )
      continue
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items: React.ReactNode[] = []
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(
          <li key={key()} className="font-serif text-[15px] text-[#2C2C2C] leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-[#8B7355] before:text-xs before:top-1">
            {parseInline(lines[i].replace(/^[-*]\s/, ''))}
          </li>
        )
        i++
      }
      elements.push(
        <ul key={key()} className="list-none pl-0 mb-4 space-y-2">
          {items}
        </ul>
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(
          <li key={key()} className="font-serif text-[15px] text-[#2C2C2C] leading-relaxed">
            {parseInline(lines[i].replace(/^\d+\.\s/, ''))}
          </li>
        )
        i++
      }
      elements.push(
        <ol key={key()} className="list-decimal pl-5 mb-4 space-y-2">
          {items}
        </ol>
      )
      continue
    }

    // Paragraph (collect consecutive non-special lines)
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^#{1,3}\s/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !lines[i].startsWith('> ') &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i])
      i++
    }

    if (paraLines.length > 0) {
      elements.push(
        <p key={key()} className="font-serif text-[15px] text-[#2C2C2C] leading-relaxed mb-4">
          {parseInline(paraLines.join(' '))}
        </p>
      )
    }
  }

  return <div className="mdx-content">{elements}</div>
}
