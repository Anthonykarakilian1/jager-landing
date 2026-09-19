'use client';

import { useEffect, useState } from 'react';
import JagerLogo from '@/components/ui/JagerLogo';

/*
  NailGunIntro v2 — Animación Cinemática de Alta Precisión
  
  Secuencia:
    1. Pistola neumática de paletizado JAGER entra y apoya su nariz sobre el tablón.
    2. ¡DISPARO!: Retroceso mecánico violento, chispas y fogonazo neumático.
    3. El clavo de acero Ring Shank penetra a gran velocidad y queda claramente visible
       clavado en el tablón de madera mientras la pistola se retira.
    4. Transición fluida al Logo Oficial JAGER "Tecnología Que Impone".
*/
export default function ForkliftIntro() {
  const [phase, setPhase] = useState<'hidden' | 'playing' | 'fadeout' | 'done'>('hidden');

  useEffect(() => {
    if (sessionStorage.getItem('jager-intro-seen-v2')) {
      setPhase('done');
      return;
    }
    setPhase('playing');

    // Desvanecimiento hacia el sitio a los 4.4s
    const t1 = setTimeout(() => setPhase('fadeout'), 4400);
    // Eliminación del overlay a los 5.1s
    const t2 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('jager-intro-seen-v2', '1');
    }, 5100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleSkip = () => {
    setPhase('fadeout');
    setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('jager-intro-seen-v2', '1');
    }, 350);
  };

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C] overflow-hidden select-none"
      style={{
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: phase === 'fadeout' ? 0 : 1,
        pointerEvents: phase === 'fadeout' ? 'none' : 'auto',
      }}
    >
      {/* Fondo técnico oscuro con dot-grid */}
      <div className="absolute inset-0 dot-grid opacity-35 pointer-events-none" />

      {/* Botón discreto para saltar animación */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 text-[10px] uppercase tracking-[0.25em] text-[#777] hover:text-[#FFFFFF] bg-[#141414] hover:bg-[#222222] border border-[#282828] rounded-full px-4 py-1.5 transition-all duration-200"
      >
        Saltar ✕
      </button>

      {/* ══════════════════════════════════════════════════════════════
          ESCENA PRINCIPAL: PISTOLA, CLAVO PROTAGONISTA Y PALETA
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-xl h-[420px]">
        
        {/* ── 1. CLAVO DE ACERO INDUSTRIAL JAGER (PROTAGONISTA) ── */}
        {/* Posicionado exactamente en el punto de penetración para apreciarse con total claridad */}
        <div
          className="absolute z-25 pointer-events-none"
          style={{
            bottom: 84,
            left: '50%',
            marginLeft: -9,
            animation: 'proNailMotion 4.6s cubic-bezier(0.2, 0.9, 0.2, 1) forwards',
          }}
        >
          <svg
            width="18"
            height="72"
            viewBox="0 0 18 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]"
          >
            <defs>
              {/* Gradiente de cabeza cromada */}
              <linearGradient id="introNailHeadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#777" />
                <stop offset="25%" stopColor="#DDD" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="75%" stopColor="#BBB" />
                <stop offset="100%" stopColor="#555" />
              </linearGradient>

              {/* Gradiente de acero pulido y reflejos metálicos */}
              <linearGradient id="introNailShankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3E3E3E" />
                <stop offset="20%" stopColor="#8E8E8E" />
                <stop offset="45%" stopColor="#FFFFFF" />
                <stop offset="75%" stopColor="#A0A0A0" />
                <stop offset="100%" stopColor="#303030" />
              </linearGradient>
            </defs>

            {/* Cabeza circular biselada con textura */}
            <ellipse cx="9" cy="3.5" rx="8.5" ry="3" fill="url(#introNailHeadGrad)" stroke="#333" strokeWidth="0.8" />
            <path d="M1 3.5 C1 5 17 5 17 3.5 L14.5 7.5 C14.5 8.5 3.5 8.5 3.5 7.5 Z" fill="#2A2A2A" />

            {/* Cuello superior */}
            <rect x="6" y="6" width="6" height="8" fill="url(#introNailShankGrad)" />

            {/* Anillos de fijación Ring Shank de alta definición */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
              const yPos = 14 + i * 4.2;
              return (
                <g key={i}>
                  <path
                    d={`M5 ${yPos + 1.2} L13 ${yPos + 1.2} L12 ${yPos + 3.8} L6 ${yPos + 3.8} Z`}
                    fill="url(#introNailShankGrad)"
                    stroke="#1E1E1E"
                    strokeWidth="0.4"
                  />
                  <line x1="8.5" y1={yPos + 1.2} x2="10.5" y2={yPos + 1.2} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.95" />
                </g>
              );
            })}

            {/* Tramo inferior y punta de diamante afilada */}
            <rect x="6" y="60" width="6" height="5" fill="url(#introNailShankGrad)" />
            <polygon points="6,65 12,65 9,72" fill="url(#introNailShankGrad)" stroke="#444" strokeWidth="0.4" />
          </svg>
        </div>

        {/* ── 2. PISTOLA NEUMÁTICA DE CLAVOS INDUSTRIAL JAGER (REFERENCIA EXACTA) ── */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            bottom: 84,
            left: '50%',
            marginLeft: -123,
            animation: 'proGunMotion 4.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            transformOrigin: '123px 268px',
          }}
        >
          {/* Imagen de alta resolución de la pistola neumática industrial del usuario */}
          <div className="relative w-[280px] h-[280px]">
            {/* Sombra de proyección en el suelo/tablón */}
            <div
              className="absolute bottom-1 left-16 w-36 h-4 bg-black/50 rounded-full blur-sm"
              style={{ transform: 'rotate(-5deg)' }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nail-gun.png"
              alt="Pistola Neumática JAGER Industrial"
              width={280}
              height={280}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
              loading="eager"
            />
          </div>
        </div>

        {/* ── 3. FOGONAZO NEUMÁTICO Y CHISPAS DE IMPACTO ── */}
        <div
          className="absolute z-40 pointer-events-none"
          style={{
            bottom: 96,
            left: '50%',
            marginLeft: 0,
            animation: 'proMuzzleFlash 4.6s ease-out forwards',
          }}
        >
          {/* Anillo de choque de aire comprimido */}
          <div className="w-24 h-24 -ml-12 -mt-12 rounded-full border-2 border-[#FFFFFF] shadow-[0_0_30px_#FFFFFF] opacity-90" />
        </div>

        {/* Chispas radiales incandescentes */}
        <div
          className="absolute z-40 pointer-events-none"
          style={{
            bottom: 96,
            left: '50%',
            marginLeft: 0,
            animation: 'sparkScatter 4.6s ease-out forwards',
          }}
        >
          {[0, 30, 60, 120, 150, 180, 210, 240, 300, 330].map((deg) => (
            <div
              key={deg}
              className="absolute top-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#FFCC00] via-[#FF4D4F] to-transparent"
              style={{
                transform: `rotate(${deg}deg) translateX(4px)`,
                transformOrigin: 'left center',
              }}
            />
          ))}
          <div className="w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#FFFFFF] shadow-[0_0_16px_#FFCC00]" />
        </div>

        {/* ── 4. PALETA DE MADERA INDUSTRIAL (VIGA Y TABLONES) ── */}
        <div
          className="absolute z-10 flex flex-col items-center pointer-events-none"
          style={{
            bottom: 32,
            animation: 'proPalletImpact 4.6s ease forwards',
          }}
        >
          {/* Tablón de cubierta de madera de pino para palets */}
          <div
            className="relative rounded-sm overflow-hidden shadow-2xl"
            style={{
              width: 360,
              height: 54,
              background: 'linear-gradient(180deg, #B58A54 0%, #946B38 45%, #755024 100%)',
              border: '1px solid #5A3C18',
              boxShadow: '0 16px 36px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.2)',
            }}
          >
            {/* Vetas de madera realista */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_32px,rgba(0,0,0,0.4)_35px,transparent_38px)]" />
            <div className="absolute top-2 inset-x-0 h-px bg-white opacity-15" />
            <div className="absolute bottom-2.5 inset-x-0 h-px bg-black opacity-35" />

            {/* Punto de impacto y fisuras microscópicas de la madera */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-[#3A220E] opacity-90 rounded-full blur-[0.5px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-px bg-[#261507]" />
          </div>

          {/* Bloques de soporte / Tacos de madera de la paleta */}
          <div className="flex justify-between w-[330px] mt-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: 68,
                  height: 26,
                  background: 'linear-gradient(180deg, #755024 0%, #543614 100%)',
                  border: '1px solid #3A230B',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                }}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ESCENA 2: REVELACIÓN CINEMÁTICA DEL LOGO JAGER
            ══════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-50 pointer-events-none px-6"
          style={{
            animation: 'proLogoReveal 4.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="flag-bar w-[2px] h-4 rounded-sm" />
            <span className="text-[9.5px] text-[#777] uppercase tracking-[0.45em] font-semibold">
              Tecnología Alemana
            </span>
            <div className="flag-bar w-[2px] h-4 rounded-sm" />
          </div>

          {/* Logo JAGER Oficial Vectorizado */}
          <div className="transform scale-110 sm:scale-125 drop-shadow-[0_0_24px_rgba(255,255,255,0.06)]">
            <JagerLogo width={280} />
          </div>

          {/* Tagline Oficial */}
          <div className="flex flex-col items-center gap-1 mt-1">
            <p className="text-xs sm:text-[13px] text-[#EBEBEB] uppercase tracking-[0.4em] font-bold">
              Tecnología Que Impone
            </p>
            <p className="text-[9px] text-[#555] uppercase tracking-[0.3em]">
              Sistemas de Fijación y Paletizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
