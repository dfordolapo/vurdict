'use client';

import React from 'react';
import { Info } from 'lucide-react';

export default function BetaTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-brand-indigo/5 via-brand-violet/5 to-brand-indigo/5 border-b border-brand-indigo/10">
      <div className="flex whitespace-nowrap animate-scroll-ticker">
        <span className="flex items-center gap-2 px-4 py-2 text-[11px] md:text-xs text-brand-indigo font-semibold">
          <Info size={14} className="text-brand-indigo/70 shrink-0" />
          Beta: For the most accurate results, submit individual UX case studies. Full portfolio website reviews are coming soon.
        </span>
        <span className="flex items-center gap-2 px-4 py-2 text-[11px] md:text-xs text-brand-indigo font-semibold">
          <Info size={14} className="text-brand-indigo/70 shrink-0" />
          Beta: For the most accurate results, submit individual UX case studies. Full portfolio website reviews are coming soon.
        </span>
        <span className="flex items-center gap-2 px-4 py-2 text-[11px] md:text-xs text-brand-indigo font-semibold">
          <Info size={14} className="text-brand-indigo/70 shrink-0" />
          Beta: For the most accurate results, submit individual UX case studies. Full portfolio website reviews are coming soon.
        </span>
      </div>
    </div>
  );
}
