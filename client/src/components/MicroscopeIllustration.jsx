export default function MicroscopeIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer orbital path */}
      <circle cx="250" cy="250" r="195" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 7" fill="none" opacity="0.25" />

      {/* Mid orbital path */}
      <circle cx="250" cy="250" r="165" stroke="#93c5fd" strokeWidth="1" strokeDasharray="8 10" fill="none" opacity="0.35" />

      {/* Inner orbital path */}
      <circle cx="250" cy="250" r="100" stroke="#93c5fd" strokeWidth="0.75" strokeDasharray="3 5" fill="none" opacity="0.2" />

      {/* Subtle cross-path connections */}
      <line x1="115" y1="115" x2="385" y2="385" stroke="#3b82f6" strokeWidth="0.5" opacity="0.1" />
      <line x1="385" y1="115" x2="115" y2="385" stroke="#3b82f6" strokeWidth="0.5" opacity="0.1" />

      {/* ─── CENTER PORTFOLIO CARD ─── */}
      <g transform="translate(250, 250)">
        {/* Card body */}
        <rect x="-88" y="-78" width="176" height="156" rx="14" fill="white" />
        <rect x="-88" y="-78" width="176" height="156" rx="14" fill="none" stroke="#e2e8f0" strokeWidth="1" />

        {/* Browser bar */}
        <rect x="-88" y="-78" width="176" height="26" rx="14" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="-88" y="-66" width="176" height="14" fill="#f8fafc" />
        {/* Browser dots */}
        <circle cx="-70" cy="-65" r="3.5" fill="#ef4444" opacity="0.7" />
        <circle cx="-58" cy="-65" r="3.5" fill="#f59e0b" opacity="0.7" />
        <circle cx="-46" cy="-65" r="3.5" fill="#10b981" opacity="0.7" />
        {/* URL bar */}
        <rect x="-30" y="-71" width="72" height="12" rx="4" fill="#f1f5f9" />

        {/* Hero image placeholder */}
        <rect x="-74" y="-38" width="148" height="46" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="-74" y="-38" width="50" height="46" rx="6" fill="#eff6ff" />
        <line x1="-6" y1="-24" x2="62" y2="-24" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="-6" y1="-14" x2="48" y2="-14" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="-6" y1="-4" x2="34" y2="-4" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* Content lines */}
        <rect x="-74" y="22" width="88" height="5" rx="2.5" fill="#3b82f6" opacity="0.15" />
        <rect x="-74" y="33" width="148" height="3" rx="1.5" fill="#e2e8f0" />
        <rect x="-74" y="40" width="120" height="3" rx="1.5" fill="#e2e8f0" />
        <rect x="-74" y="47" width="100" height="3" rx="1.5" fill="#e2e8f0" />

        {/* Mini card grid */}
        <rect x="-74" y="58" width="38" height="14" rx="3" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="-30" y="58" width="38" height="14" rx="3" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="14" y="58" width="38" height="14" rx="3" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      </g>

      {/* ─── NODE 1 — Top: Magnifying Glass ─── */}
      <g transform="translate(250, 55)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#172554" strokeWidth="2" />
        <line x1="12" y1="12" x2="26" y2="26" stroke="#172554" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="-6" y="-9" width="10" height="14" rx="1.5" stroke="#172554" strokeWidth="1.5" fill="none" opacity="0.5" />
        <line x1="-3" y1="-4" x2="1" y2="-4" stroke="#172554" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="-3" y1="0" x2="1" y2="0" stroke="#172554" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* ─── NODE 2 — Top-right: Checkmark ─── */}
      <g transform="translate(393, 108)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <polyline points="-10,1 -4,9 12,-7" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ─── NODE 3 — Right: Star ─── */}
      <g transform="translate(445, 250)">
        <path d="M0 -22 L4 -8 L18 -5 L4 -1 L0 13 L-4 -1 L-18 -5 L-4 -8 Z" fill="#93c5fd" />
      </g>

      {/* ─── NODE 4 — Bottom-right: Bar Chart ─── */}
      <g transform="translate(393, 392)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#172554" strokeWidth="2" />
        <rect x="-12" y="2" width="7" height="14" rx="1.5" fill="#93c5fd" />
        <rect x="-2" y="-6" width="7" height="22" rx="1.5" fill="#172554" opacity="0.3" />
        <rect x="8" y="8" width="7" height="8" rx="1.5" fill="#93c5fd" />
      </g>

      {/* ─── NODE 5 — Bottom: Target / Crosshair ─── */}
      <g transform="translate(250, 445)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3" fill="#3b82f6" />
        <line x1="-24" y1="0" x2="-20" y2="0" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="0" x2="24" y2="0" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="-24" x2="0" y2="-20" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="20" x2="0" y2="24" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ─── NODE 6 — Bottom-left: Document ─── */}
      <g transform="translate(107, 392)">
        <rect x="-10" y="-13" width="20" height="26" rx="3" fill="none" stroke="#172554" strokeWidth="2" />
        <line x1="-5" y1="-3" x2="5" y2="-3" stroke="#172554" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="-5" y1="3" x2="5" y2="3" stroke="#172554" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="-5" y1="9" x2="2" y2="9" stroke="#172554" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* ─── NODE 7 — Left: Gauge / Meter ─── */}
      <g transform="translate(55, 250)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#93c5fd" strokeWidth="2" />
        <path d="M-14 8 A18 18 0 0 1 14 8" stroke="#172554" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
        <line x1="0" y1="0" x2="0" y2="-14" stroke="#172554" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* ─── NODE 8 — Top-left: Magnifying Glass + Grid ─── */}
      <g transform="translate(107, 108)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <line x1="12" y1="12" x2="24" y2="24" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <rect x="-7" y="-7" width="14" height="14" rx="2" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#3b82f6" strokeWidth="0.75" opacity="0.4" />
        <line x1="0" y1="-7" x2="0" y2="7" stroke="#3b82f6" strokeWidth="0.75" opacity="0.4" />
      </g>

      {/* ─── PULSE DOTS ON ORBIT ─── */}
      <circle cx="250" cy="55" r="3" fill="#172554" opacity="0.5" />
      <circle cx="393" cy="108" r="3" fill="#3b82f6" opacity="0.5" />
      <circle cx="445" cy="250" r="3" fill="#93c5fd" opacity="0.5" />
      <circle cx="393" cy="392" r="3" fill="#172554" opacity="0.5" />
      <circle cx="250" cy="445" r="3" fill="#3b82f6" opacity="0.5" />
      <circle cx="107" cy="392" r="3" fill="#172554" opacity="0.5" />
      <circle cx="55" cy="250" r="3" fill="#93c5fd" opacity="0.5" />
      <circle cx="107" cy="108" r="3" fill="#3b82f6" opacity="0.5" />

      {/* ─── SMALL FLOATING PARTICLES ─── */}
      <circle cx="180" cy="50" r="1.5" fill="#3b82f6" opacity="0.3" />
      <circle cx="420" cy="180" r="1.5" fill="#172554" opacity="0.3" />
      <circle cx="430" cy="330" r="1.5" fill="#93c5fd" opacity="0.3" />
      <circle cx="180" cy="450" r="1.5" fill="#3b82f6" opacity="0.3" />
      <circle cx="80" cy="340" r="1.5" fill="#172554" opacity="0.3" />
      <circle cx="60" cy="160" r="1.5" fill="#93c5fd" opacity="0.3" />
      <circle cx="330" cy="460" r="1.5" fill="#3b82f6" opacity="0.3" />
      <circle cx="170" cy="450" r="1.5" fill="#172554" opacity="0.3" />
      <circle cx="440" cy="200" r="1.5" fill="#93c5fd" opacity="0.3" />
      <circle cx="70" cy="310" r="1.5" fill="#3b82f6" opacity="0.3" />
      <circle cx="320" cy="45" r="1.5" fill="#93c5fd" opacity="0.3" />
      <circle cx="150" cy="55" r="1.5" fill="#172554" opacity="0.3" />
    </svg>
  )
}
