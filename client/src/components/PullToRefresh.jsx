import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────
const PULL_THRESHOLD = 150  // px to trigger refresh
const MAX_PULL       = 200  // max visual stretch

// ─── Rubber-band easing ───────────────────────────────────────────────────────
const rubberband = (x, limit) => limit * (1 - Math.exp(-x / limit))

// ─────────────────────────────────────────────────────────────────────────────
// AI Mascot — inline SVG robot character
// progress: 0→1 (maps to pull distance / threshold)
// ─────────────────────────────────────────────────────────────────────────────
function AIMascot({ progress, isLoading }) {
  const p = Math.min(1, Math.max(0, progress))

  // Staggered reveal as user pulls
  const bodyOpacity     = Math.min(1, p * 1.8)
  const eyeOpacity      = Math.min(1, Math.max(0, (p - 0.15) * 2.5))
  const antennaOpacity  = Math.min(1, Math.max(0, (p - 0.05) * 2))
  const armsOpacity     = Math.min(1, Math.max(0, (p - 0.3) * 2.5))
  const sparkleOpacity  = Math.min(1, Math.max(0, (p - 0.55) * 3.5))

  // Eye glow colour shifts from dim → vivid as threshold approaches
  const eyeGlow   = `rgba(59, 130, 246, ${0.3 + p * 0.7})`
  const eyeCenter = `rgba(147, 197, 253, ${0.6 + p * 0.4})`

  // Subtle body bob when loading — unused now but kept for future use
  const bobClass = ''

  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={bobClass}
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* ── Antenna ───────────────────────────────────────────────────── */}
      <g opacity={antennaOpacity}>
        {/* Stem */}
        <line x1="50" y1="6" x2="50" y2="18" stroke="#172554" strokeWidth="2.5" strokeLinecap="round" />
        {/* Orb */}
        <circle cx="50" cy="5" r="4" fill="#3b82f6" />
        <circle cx="50" cy="5" r="2" fill="#93c5fd" />
        {/* Orb glow ring */}
        <circle
          cx="50" cy="5" r="6"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity={0.3}
        />
      </g>

      {/* ── Head ──────────────────────────────────────────────────────── */}
      <g opacity={bodyOpacity}>
        {/* Head shell */}
        <rect x="22" y="18" width="56" height="46" rx="16" fill="#172554" />
        {/* Highlight strip */}
        <rect x="28" y="20" width="44" height="6" rx="4" fill="rgba(255,255,255,0.08)" />

        {/* ── Visor / Eye ───────────────────────────────────────────── */}
        <g opacity={eyeOpacity}>
          {/* Outer visor frame */}
          <rect x="30" y="27" width="40" height="24" rx="10" fill="#0f172a" />
          {/* Scan gradient */}
          <rect x="32" y="29" width="36" height="20" rx="8"
            fill="url(#eyeGrad)"
          />
          {/* Iris */}
          <circle cx="50" cy="39" r="7" fill={eyeGlow} />
          <circle cx="50" cy="39" r="4" fill={eyeCenter} />
          <circle cx="50" cy="39" r="2" fill="white" opacity="0.9" />
          {/* Pupil glint */}
          <circle cx="52.5" cy="37" r="1" fill="white" opacity="0.7" />



          {/* Gradient defs */}
          <defs>
            <linearGradient id="eyeGrad" x1="32" y1="29" x2="68" y2="49" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </g>

        {/* Ear / side ports */}
        <rect x="18" y="32" width="6" height="12" rx="3" fill="#1e3a8a" />
        <rect x="76" y="32" width="6" height="12" rx="3" fill="#1e3a8a" />
      </g>

      {/* ── Neck ──────────────────────────────────────────────────────── */}
      <g opacity={bodyOpacity}>
        <rect x="43" y="64" width="14" height="8" rx="3" fill="#1e293b" />
      </g>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <g opacity={bodyOpacity}>
        {/* Torso */}
        <rect x="28" y="72" width="44" height="36" rx="12" fill="#1e3a8a" />
        {/* Chest panel */}
        <rect x="36" y="78" width="28" height="18" rx="6" fill="#172554" />
        {/* Panel detail — three dots */}
        <circle cx="44" cy="87" r="2" fill="#3b82f6" opacity="0.9" />
        <circle cx="50" cy="87" r="2" fill="#60a5fa" opacity="0.7" />
        <circle cx="56" cy="87" r="2" fill="#93c5fd" opacity="0.5" />
        {/* Waist stripe */}
        <rect x="28" y="100" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
      </g>

      {/* ── Arms ──────────────────────────────────────────────────────── */}
      <g opacity={armsOpacity}>
        {/* Left arm */}
        <rect x="12" y="74" width="16" height="10" rx="5" fill="#172554" />
        <circle cx="12" cy="79" r="5" fill="#1e3a8a" />
        {/* Right arm — holds magnifying glass */}
        <rect x="72" y="74" width="16" height="10" rx="5" fill="#172554" />
        <circle cx="88" cy="79" r="5" fill="#1e3a8a" />
        {/* Magnifying glass */}
        <circle cx="91" cy="76" r="5" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <line x1="87" y1="80" x2="84" y2="83" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="91" cy="76" r="2.5" fill="rgba(147,197,253,0.25)" />
      </g>

      {/* ── Sparkles ──────────────────────────────────────────────────── */}
      <g opacity={sparkleOpacity}>
        {/* Top-left sparkle */}
        <g transform="translate(10, 28)">
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="0" cy="0" r="1.5" fill="#93c5fd" />
        </g>
        {/* Top-right sparkle */}
        <g transform="translate(90, 22)">
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="0" cy="0" r="1" fill="#a5b4fc" />
        </g>
        {/* Lower sparkle */}
        <g transform="translate(15, 95)">
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Pull-to-Refresh component
// ─────────────────────────────────────────────────────────────────────────────
export default function PullToRefresh() {
  const [phase,    setPhase]  = useState('idle')   // idle | pulling | ready
  const [pullY,    setPullY]  = useState(0)

  const touchStartY  = useRef(0)
  const touchStartX  = useRef(0)
  const touchStartSY = useRef(0)
  const isDragging   = useRef(false)

  const progress = Math.min(1, pullY / PULL_THRESHOLD)
  const isReady  = pullY >= PULL_THRESHOLD

  // ── Touch handlers ────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    touchStartY.current  = e.touches[0].clientY
    touchStartX.current  = e.touches[0].clientX
    touchStartSY.current = window.scrollY
    isDragging.current   = false
  }, [])

  const onTouchMove = useCallback((e) => {
    // If the page was scrolled at start, or has scrolled during this gesture, abort PTR.
    if (touchStartSY.current > 0 || window.scrollY > 0) return

    // Ensure no nested scrollable container is scrolled down.
    let el = e.target;
    while (el && el !== document.documentElement && el !== document.body) {
      if (el.scrollTop > 0) return;
      el = el.parentElement;
    }

    const deltaY = e.touches[0].clientY - touchStartY.current
    const deltaX = e.touches[0].clientX - touchStartX.current
    if (deltaY <= 0) return

    // Reject horizontal swipes: if the user moves more sideways than down, it's a swipe not a pull
    if (Math.abs(deltaX) > Math.abs(deltaY) * 0.5) return

    // Require an actual pull (wait for 40px movement) before taking over the event
    if (deltaY < 40 && !isDragging.current) return

    e.preventDefault()
    isDragging.current = true

    setPhase(deltaY >= PULL_THRESHOLD ? 'ready' : 'pulling')
    setPullY(deltaY)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false

    if (pullY >= PULL_THRESHOLD) {
      navigator.vibrate?.(40)   // haptic snap on Android
      window.location.reload()
    } else {
      setPhase('idle')
      setPullY(0)
    }
  }, [pullY])

  useEffect(() => {
    // PTR is touch-only — skip entirely on non-touch devices (laptops, desktops)
    if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) return

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove',  onTouchMove,  { passive: false })
    document.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove',  onTouchMove)
      document.removeEventListener('touchend',   onTouchEnd)
    }
  }, [onTouchStart, onTouchMove, onTouchEnd])

  if (phase === 'idle') return null

  // Clamp the visible slide-down offset
  const slideY = Math.min(MAX_PULL, rubberband(pullY, MAX_PULL))

  return (
    <div
      className="ptr-overlay"
      style={{ transform: `translateY(${slideY - MAX_PULL}px)` }}
      aria-live="polite"
      aria-label={isReady ? 'Release to refresh' : 'Pull to refresh'}
    >
      {/* ── Mascot card ─────────────────────────────────────── */}
      <div
        className={`ptr-card ${isReady ? 'ptr-card--ready' : ''}`}
        style={{
          opacity:   Math.min(1, progress * 1.5),
          transform: `scale(${0.65 + progress * 0.35})`,
          transition: isReady
            ? 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease, box-shadow 0.25s ease'
            : 'none',
        }}
      >
        <div className="ptr-mascot-frame">
          <AIMascot progress={progress} isLoading={false} />
        </div>
      </div>

      {/* ── Label ───────────────────────────────────────────── */}
      <span
        className="ptr-label"
        style={{ opacity: Math.min(1, progress * 1.8) }}
      >
        Release to refresh
      </span>
    </div>
  )
}
