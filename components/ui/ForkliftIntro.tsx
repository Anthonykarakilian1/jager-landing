'use client';

import { useEffect, useState } from 'react';

/*
  ForkliftIntro — CSS-only keyframe animation
  All animation names are defined in globals.css:
    driveIn, liftFork, palletRise
  Plays once per session (sessionStorage flag).
*/
export default function ForkliftIntro() {
  const [phase, setPhase] = useState<'hidden' | 'playing' | 'fadeout' | 'done'>('hidden');

  useEffect(() => {
    if (sessionStorage.getItem('jager-intro')) {
      setPhase('done');
      return;
    }
    setPhase('playing');

    // Start fade-out after animation finishes (3.8s)
    const t1 = setTimeout(() => setPhase('fadeout'), 3800);
    // Remove overlay fully after fade (0.8s more)
    const t2 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('jager-intro', '1');
    }, 4600);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C] overflow-hidden"
      style={{
        transition: 'opacity 0.8s ease',
        opacity: phase === 'fadeout' ? 0 : 1,
        pointerEvents: phase === 'fadeout' ? 'none' : 'auto',
      }}
    >
      {/* Dot grid bg */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Horizontal scan line */}
      <div className="scan-line" />

      {/* ── Forklift scene wrapper (moves left → center → right) ── */}
      <div
        style={{
          animation: 'driveIn 3.8s cubic-bezier(0.4,0,0.2,1) forwards',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* ── PALLET GROUP (rises with forks) ── */}
        <div
          style={{
            position: 'absolute',
            left: 4,
            bottom: 52,
            animation: 'palletRise 3.8s cubic-bezier(0.4,0,0.2,1) forwards',
          }}
        >
          {/* Cargo box */}
          <div style={{
            width: 88, height: 26,
            background: '#1E1409',
            border: '1px solid #2E1D0E',
            borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 2,
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 13, letterSpacing: 3,
              color: '#FFCC00',
            }}>JAGER</span>
          </div>
          {/* Pallet planks */}
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 88, height: 7,
              background: i % 2 === 0 ? '#B8955A' : '#9A7844',
              borderRadius: 1, marginBottom: 1,
            }} />
          ))}
        </div>

        {/* ── FORKLIFT SVG ── */}
        <svg
          width="260"
          height="180"
          viewBox="0 0 260 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* --- Mast (vertical rails) --- */}
          <rect x="20" y="20" width="7" height="120" fill="#1E1409" stroke="#2E1D0E" strokeWidth="1.5" />
          <rect x="36" y="20" width="7" height="120" fill="#1E1409" stroke="#2E1D0E" strokeWidth="1.5" />
          {/* Mast cross braces */}
          <line x1="20" y1="60"  x2="43" y2="60"  stroke="#2E1D0E" strokeWidth="2.5" />
          <line x1="20" y1="90"  x2="43" y2="90"  stroke="#2E1D0E" strokeWidth="2.5" />
          <line x1="20" y1="115" x2="43" y2="115" stroke="#2E1D0E" strokeWidth="2.5" />

          {/* --- FORKS (animated up) --- */}
          <g style={{ animation: 'liftFork 3.8s cubic-bezier(0.4,0,0.2,1) forwards' }}>
            {/* Carriage */}
            <rect x="8" y="118" width="56" height="9" fill="#CC0000" rx="1.5" />
            {/* Fork tines */}
            <rect x="8"  y="126" width="55" height="5" fill="#EDE8E2" rx="1" />
            <rect x="8"  y="134" width="55" height="5" fill="#EDE8E2" rx="1" />
            {/* Fork tips (slight angle) */}
            <polygon points="63,126 68,128 63,131" fill="#C8C0B8" />
            <polygon points="63,134 68,136 63,139" fill="#C8C0B8" />
          </g>

          {/* --- Body chassis --- */}
          <rect x="48" y="95" width="160" height="50" fill="#171008" stroke="#2E1D0E" strokeWidth="1.5" rx="4" />
          {/* Engine hood */}
          <rect x="178" y="82" width="36" height="30" fill="#1E1409" stroke="#2E1D0E" strokeWidth="1.5" rx="3" />
          {/* Exhaust */}
          <rect x="206" y="72" width="5" height="16" fill="#2E1D0E" rx="2" />
          <rect x="204" y="70" width="9" height="4"  fill="#2E1D0E" rx="1" />

          {/* Cabin */}
          <rect x="85" y="65" width="60" height="38" fill="#0D0906" stroke="#2E1D0E" strokeWidth="1.5" rx="3" />
          {/* Cabin window */}
          <rect x="91" y="70" width="48" height="23" fill="#1E1409" stroke="#CC0000" strokeWidth="1.2" rx="2" opacity="0.8" />
          {/* Driver head */}
          <ellipse cx="112" cy="78" rx="7" ry="8" fill="#2E1D0E" />
          {/* Driver body */}
          <rect x="106" y="86" width="14" height="10" fill="#2E1D0E" rx="1" />

          {/* Roll cage */}
          <line x1="85"  y1="65" x2="85"  y2="50" stroke="#2E1D0E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="145" y1="65" x2="145" y2="50" stroke="#2E1D0E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="85"  y1="50" x2="145" y2="50" stroke="#2E1D0E" strokeWidth="2.5" strokeLinecap="round" />

          {/* German stripe on body */}
          <rect x="48" y="137" width="160" height="3" fill="#1A1A1A" rx="1" />
          <rect x="48" y="141" width="160" height="3" fill="#CC0000" rx="1" />
          <rect x="48" y="145" width="160" height="3" fill="#FFCC00" rx="1" />

          {/* Counterweight */}
          <rect x="206" y="110" width="12" height="36" fill="#1E1409" stroke="#2E1D0E" strokeWidth="1.5" rx="2" />

          {/* --- Wheels --- */}
          {/* Front wheel */}
          <circle cx="100" cy="152" r="22" fill="#111" stroke="#2E1D0E" strokeWidth="2.5" />
          <circle cx="100" cy="152" r="12" fill="#0D0906" stroke="#CC0000" strokeWidth="2" />
          <circle cx="100" cy="152" r="4"  fill="#CC0000" />
          {/* Rear wheel */}
          <circle cx="185" cy="152" r="18" fill="#111" stroke="#2E1D0E" strokeWidth="2.5" />
          <circle cx="185" cy="152" r="9"  fill="#0D0906" stroke="#CC0000" strokeWidth="1.5" />
          <circle cx="185" cy="152" r="3"  fill="#CC0000" />

          {/* Ground line */}
          <line x1="0" y1="175" x2="260" y2="175" stroke="#2E1D0E" strokeWidth="1" strokeDasharray="6 4" />
        </svg>
      </div>

      {/* Brand tag below forklift */}
      <div
        className="flex flex-col items-center gap-2 mt-4"
        style={{
          animation: 'driveIn 3.8s cubic-bezier(0.4,0,0.2,1) forwards',
        }}
      >
        <span
          className="font-bebas text-3xl tracking-[0.5em]"
          style={{ color: 'rgba(237,232,226,0.5)', letterSpacing: '0.5em' }}
        >
          JAGER
        </span>
        {/* Mini German flag */}
        <div className="flex gap-[2px]">
          {['#1A1A1A','#CC0000','#FFCC00'].map((c) => (
            <div key={c} style={{ width: 20, height: 3, background: c, borderRadius: 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
