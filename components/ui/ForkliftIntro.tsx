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
        {/* Posicionado en el centro del tablón para que al dispararse quede clavado y se aprecie con total nitidez */}
        <div
          className="absolute z-25 pointer-events-none"
          style={{
            bottom: 82,
            left: '50%',
            marginLeft: -8,
            animation: 'proNailMotion 4.6s cubic-bezier(0.2, 0.9, 0.2, 1) forwards',
          }}
        >
          <svg
            width="18"
            height="68"
            viewBox="0 0 18 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            <defs>
              {/* Gradiente cromado para la cabeza del clavo */}
              <linearGradient id="introNailHeadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#666" />
                <stop offset="30%" stopColor="#EEE" />
                <stop offset="60%" stopColor="#FFF" />
                <stop offset="100%" stopColor="#555" />
              </linearGradient>

              {/* Gradiente de acero pulido para el vástago */}
              <linearGradient id="introNailShankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3A3A3A" />
                <stop offset="25%" stopColor="#999999" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="75%" stopColor="#AAAAAA" />
                <stop offset="100%" stopColor="#333333" />
              </linearGradient>
            </defs>

            {/* Cabeza circular con relieve biselado */}
            <ellipse cx="9" cy="3" rx="8.5" ry="2.8" fill="url(#introNailHeadGrad)" stroke="#444" strokeWidth="0.6" />
            <path d="M1 3 C1 4.5 17 4.5 17 3 L14 6 C14 7 4 7 4 6 Z" fill="#333" />

            {/* Cuello liso superior */}
            <rect x="6.5" y="5" width="5" height="8" fill="url(#introNailShankGrad)" />

            {/* Ranuras Ring Shank (anillado de fijación extrema) */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const yPos = 13 + i * 4.2;
              return (
                <g key={i}>
                  <path
                    d={`M5.5 ${yPos + 1.5} L12.5 ${yPos + 1.5} L11.5 ${yPos + 3.8} L6.5 ${yPos + 3.8} Z`}
                    fill="url(#introNailShankGrad)"
                    stroke="#222"
                    strokeWidth="0.3"
                  />
                  <line x1="8.5" y1={yPos + 1.5} x2="10" y2={yPos + 1.5} stroke="#FFF" strokeWidth="0.7" opacity="0.9" />
                </g>
              );
            })}

            {/* Tramo inferior y punta de diamante */}
            <rect x="6.5" y="55" width="5" height="5" fill="url(#introNailShankGrad)" />
            <polygon points="6.5,60 11.5,60 9,67" fill="url(#introNailShankGrad)" stroke="#555" strokeWidth="0.4" />
          </svg>
        </div>

        {/* ── 2. PISTOLA NEUMÁTICA DE CLAVOS INDUSTRIAL JAGER (SVG HD) ── */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            bottom: 110,
            left: '50%',
            marginLeft: -116,
            animation: 'proGunMotion 4.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            transformOrigin: 'bottom center',
          }}
        >
          <svg
            width="250"
            height="210"
            viewBox="0 0 250 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gunChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#303030" />
                <stop offset="40%" stopColor="#1E1E1E" />
                <stop offset="100%" stopColor="#111111" />
              </linearGradient>

              <linearGradient id="magazineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252525" />
                <stop offset="50%" stopColor="#171717" />
                <stop offset="100%" stopColor="#0B0B0B" />
              </linearGradient>

              <linearGradient id="steelNoseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#444444" />
                <stop offset="35%" stopColor="#CCCCCC" />
                <stop offset="65%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#444444" />
              </linearGradient>
            </defs>

            {/* Sombra de la pistola */}
            <ellipse cx="116" cy="195" rx="55" ry="8" fill="#000000" opacity="0.4" />

            {/* ── CARGADOR DE TAMBOR (COIL MAGAZINE) ── */}
            <circle cx="70" cy="115" r="46" fill="url(#magazineGrad)" stroke="#383838" strokeWidth="2.5" />
            <circle cx="70" cy="115" r="36" fill="#151515" stroke="#282828" strokeWidth="1.5" />
            
            {/* Ventana de inspección del rollo de clavos dorados en espiral */}
            <circle cx="70" cy="115" r="28" fill="#0D0D0D" stroke="#B80000" strokeWidth="1" strokeDasharray="5 3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const nx = 70 + 20 * Math.cos(rad);
              const ny = 115 + 20 * Math.sin(rad);
              return (
                <circle key={deg} cx={nx} cy={ny} r="2.2" fill="#FFC53D" opacity="0.8" />
              );
            })}
            <circle cx="70" cy="115" r="12" fill="#222" stroke="#444" strokeWidth="1.5" />

            {/* Pestillo de apertura del cargador */}
            <rect x="22" y="108" width="10" height="14" rx="2" fill="#B80000" stroke="#333" strokeWidth="1" />

            {/* ── EMPUÑADURA ERGONÓMICA DE GOMA (HANDLE) ── */}
            <path
              d="M135 55 L178 88 C185 94 186 106 178 122 L164 156 C160 164 152 168 144 168 L134 168 L126 126 L122 68 Z"
              fill="#181818"
              stroke="#2A2A2A"
              strokeWidth="1.5"
            />
            {/* Estrías antideslizantes rojas JAGER */}
            <line x1="148" y1="102" x2="168" y2="118" stroke="#B80000" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="143" y1="118" x2="163" y2="134" stroke="#B80000" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="138" y1="134" x2="158" y2="150" stroke="#B80000" strokeWidth="2.5" strokeLinecap="round" />

            {/* Acople rápido de aire neumático y manguera en espiral */}
            <rect x="136" y="168" width="14" height="20" rx="2" fill="url(#steelNoseGrad)" stroke="#333" strokeWidth="1" />
            <path d="M143 188 C143 198 165 200 165 208 C165 214 150 216 150 222" stroke="#2A2A2A" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* ── CILINDRO PRINCIPAL DE POTENCIA (PISTON HOUSING) ── */}
            <rect x="82" y="30" width="56" height="82" rx="8" fill="url(#gunChassisGrad)" stroke="#383838" strokeWidth="1.8" />
            
            {/* Deflector de escape de aire superior con bandera alemana */}
            <rect x="78" y="20" width="64" height="15" rx="3" fill="#1C1C1C" stroke="#444" strokeWidth="1.2" />
            <rect x="88" y="24.5" width="44" height="2" fill="#1A1A1A" />
            <rect x="88" y="26.5" width="44" height="2" fill="#B80000" />
            <rect x="88" y="28.5" width="44" height="2" fill="#C8960C" />

            {/* Gatillo de precisión */}
            <path d="M120 86 C130 86 132 94 128 102 L122 106" stroke="#EAEAEA" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Placa metálica lateral con relieve JAGER */}
            <rect x="88" y="52" width="44" height="22" rx="3" fill="#141414" stroke="#2D2D2D" strokeWidth="1" />
            <text x="110" y="68" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="13" fill="#EAEAEA" letterSpacing="2">
              JAGER
            </text>

            {/* ── NARIZ DE DISPARO Y SEGURO DE CONTACTO (NOSEPIECE) ── */}
            {/* Guía alimentadora desde el cargador */}
            <path d="M98 132 L58 132 L66 106 L98 106 Z" fill="#1C1C1C" stroke="#333" strokeWidth="1" />
            
            {/* Cañón / Nariz de acero templado */}
            <rect x="98" y="106" width="20" height="84" rx="2" fill="url(#steelNoseGrad)" stroke="#282828" strokeWidth="1" />
            {/* Seguro de contacto inferior que presiona la madera */}
            <rect x="95" y="184" width="26" height="10" rx="2" fill="#1A1A1A" stroke="#FFC53D" strokeWidth="1.5" />
          </svg>
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
