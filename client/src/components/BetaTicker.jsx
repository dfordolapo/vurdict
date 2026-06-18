import React from 'react'
import { Info } from 'lucide-react'

const MESSAGE = "For the most accurate results, submit individual UX case studies."

export default function BetaTicker() {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-blue-50/80 border-b border-blue-100/60">
      <div className="flex whitespace-nowrap animate-scroll-ticker">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex items-center gap-2 px-4 py-2 text-[11px] md:text-xs text-blue-700 font-medium">
            <Info size={14} className="text-blue-500 shrink-0" />
            {MESSAGE}
          </span>
        ))}
      </div>
    </div>
  )
}
