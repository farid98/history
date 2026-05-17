import TimelineExplorer from '@/components/TimelineExplorer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Page header */}
      <header className="border-b border-[#E8E0D5] bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <div>
            <h1 className="font-serif text-xl font-bold text-[#2C2C2C] leading-tight">
              Historical Timeline
            </h1>
            <p className="text-xs font-sans text-[#888] mt-0.5">
              4000 BCE – 2026 CE &nbsp;·&nbsp; Three zoom levels
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden md:flex items-center gap-1.5 text-xs font-sans text-[#888]">
              <span className="w-2 h-2 rounded-full bg-[#8B7355] inline-block" />
              Ancient
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-xs font-sans text-[#888]">
              <span className="w-2 h-2 rounded-full bg-[#4A6741] inline-block" />
              Post-Classical
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-xs font-sans text-[#888]">
              <span className="w-2 h-2 rounded-full bg-[#2C4A7C] inline-block" />
              Early Modern
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-xs font-sans text-[#888]">
              <span className="w-2 h-2 rounded-full bg-[#6B3A7D] inline-block" />
              Modern
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-xs font-sans text-[#888]">
              <span className="w-2 h-2 rounded-full bg-[#C0392B] inline-block" />
              Contemporary
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro blurb */}
        <div className="mb-8 max-w-2xl">
          <p className="font-serif text-[15px] text-[#555] leading-relaxed">
            Journey through 6,000 years of human civilization. Select a zoom level to explore
            history at different granularities — from sweeping millennial epochs to individual
            centuries of change. Click any card to read the full account.
          </p>
        </div>

        {/* Timeline explorer */}
        <TimelineExplorer />
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E8E0D5] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-sans text-[#aaa] text-center">
            Historical Timeline &copy; {new Date().getFullYear()} &nbsp;·&nbsp;
            Content is illustrative and spans 4000 BCE – 2026 CE
          </p>
        </div>
      </footer>
    </main>
  )
}
