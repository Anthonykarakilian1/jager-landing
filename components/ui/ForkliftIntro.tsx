'use client';

import { useEffect, useState } from 'react';
import JagerLogo from '@/components/ui/JagerLogo';

/*
  NailGunIntro — Animación Cinemática de Inicio JAGER
  
  Secuencia:
    1. Una pistola neumática de clavos para paletizado se posiciona sobre la madera.
    2. ¡DISPARO!: Retroceso mecánico instantáneo, destello de aire/chispas y el clavo
       penetra a gran velocidad clavándose firmemente en la paleta de madera.
    3. Transición fluida donde emerge el Logo Oficial JAGER "Tecnología Que Impone".
    4. Cierre automático suave hacia la landing page.
*/
export default function ForkliftIntro() {
  const [phase, setPhase] = useState<'hidden' | 'playing' | 'fadeout' | 'done'>('hidden');

  useEffect(() => {
    // Si ya se reprodujo en la sesión, no vuelve a bloquear (se puede reiniciar recargando)
    if (sessionStorage.getItem('jager-intro-seen')) {
      setPhase('done');
      return;
    }
    setPhase('playing');

    // Inicio del desvanecimiento suave después del disparo y el logo (4.2s)
    const t1 = setTimeout(() => setPhase('fadeout'), 4200);
    // Cierre completo del overlay (4.9s)
    const t2 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('jager-intro-seen', '1');
    }, 4900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleSkip = () => {
    setPhase('fadeout');
    setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('jager-intro-seen', '1');
    }, 400);
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
      {/* Fondo técnico con sutil cuadrícula de puntos */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Botón discreto para saltar animación */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 text-[10px] uppercase tracking-[0.25em] text-[#666] hover:text-[#EBEBEB] bg-[#141414] hover:bg-[#202020] border border-[#282828] rounded-full px-4 py-1.5 transition-all duration-200"
      >
        Saltar ✕
      </button>

      {/* ══════════════════════════════════════════════════════════════
          ESCENA 1: PISTOLA DE CLAVOS, DISPARO Y PALETA DE MADERA
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg h-96">
        
        {/* ── 1. Pistola Neumática de Clavos Industrial (SVG con retroceso) ── */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            bottom: 110,
            left: '50%',
            marginLeft: -100,
            animation: 'gunRecoil 4.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            transformOrigin: 'bottom center',
          }}
        >
          <svg
            width="220"
            height="180"
            viewBox="0 0 220 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gunBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A2A2A" />
                <stop offset="50%" stopColor="#181818" />
                <stop offset="100%" stopColor="#0E0E0E" />
              </linearGradient>
              <linearGradient id="metalNoseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#555" />
                <stop offset="50%" stopColor="#DDD" />
                <stop offset="100%" stopColor="#444" />
              </linearGradient>
            </defs>

            {/* Tambor / Cargador de rollos de clavos (Coil Magazine) */}
            <circle cx="68" cy="98" r="42" fill="#141414" stroke="#2E2E2E" strokeWidth="2.5" />
            <circle cx="68" cy="98" r="32" fill="#1C1C1C" stroke="#B80000" strokeWidth="1.2" strokeDasharray="6 4" />
            <circle cx="68" cy="98" r="14" fill="#0A0A0A" stroke="#333" strokeWidth="2" />

            {/* Empuñadura ergonómica con acento */}
            <path
              d="M120 45 L155 75 C160 80 162 90 156 105 L144 135 C141 142 135 146 128 146 L120 146 L112 110 L108 55 Z"
              fill="#181818"
              stroke="#2A2A2A"
              strokeWidth="1.5"
            />
            {/* Grip estriado de goma antideslizante */}
            <line x1="130" y1="90" x2="148" y2="105" stroke="#B80000" strokeWidth="2" strokeLinecap="round" />
            <line x1="126" y1="105" x2="144" y2="120" stroke="#B80000" strokeWidth="2" strokeLinecap="round" />
            <line x1="122" y1="120" x2="140" y2="135" stroke="#B80000" strokeWidth="2" strokeLinecap="round" />

            {/* Conector neumático de aire comprimido inferior */}
            <rect x="122" y="146" width="12" height="18" rx="2" fill="url(#metalNoseGrad)" />
            <line x1="120" y1="152" x2="136" y2="152" stroke="#222" strokeWidth="2" />

            {/* Cuerpo principal / Cilindro del pistón de impacto */}
            <rect x="74" y="24" width="46" height="70" rx="6" fill="url(#gunBodyGrad)" stroke="#333" strokeWidth="1.5" />
            
            {/* Tapa superior de escape con franja alemana */}
            <rect x="70" y="16" width="54" height="12" rx="3" fill="#1C1C1C" stroke="#3A3A3A" strokeWidth="1" />
            <rect x="78" y="20" width="38" height="1.5" fill="#1A1A1A" />
            <rect x="78" y="21.5" width="38" height="1.5" fill="#B80000" />
            <rect x="78" y="23" width="38" height="1.5" fill="#C8960C" />

            {/* Gatillo de disparo */}
            <path d="M108 72 C115 72 118 78 116 84 L110 88" stroke="#EBEBEB" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Nariz de disparo y seguro de contacto frontal (Nosepiece) */}
            <rect x="88" y="94" width="18" height="74" rx="2" fill="url(#metalNoseGrad)" stroke="#222" strokeWidth="1" />
            <rect x="85" y="164" width="24" height="8" rx="2" fill="#222" stroke="#C8960C" strokeWidth="1" />

            {/* Guía de clavos que conecta el tambor a la nariz */}
            <path d="M88 115 L50 115 L60 90 L88 90 Z" fill="#222" stroke="#333" strokeWidth="1" />
          </svg>
        </div>

        {/* ── 2. Destello de Aire Neumático y Chispas de Impacto (Muzzle Flash) ── */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            bottom: 110,
            left: '50%',
            marginLeft: -8,
            animation: 'muzzleBurst 4.2s ease-out forwards',
          }}
        >
          {/* Anillo de choque de aire comprimido */}
          <div className="w-16 h-16 -ml-8 -mt-8 rounded-full border-2 border-[#FFFFFF] shadow-[0_0_20px_#FFFFFF] opacity-80" />
          {/* Chispas radiales */}
          <div className="absolute top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[#FFD43B] rounded-full shadow-[0_0_12px_#FFCC00]" />
          <div className="absolute top-0 left-0 w-8 h-0.5 -ml-4 bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent rotate-45" />
          <div className="absolute top-0 left-0 w-8 h-0.5 -ml-4 bg-gradient-to-r from-transparent via-[#FFD43B] to-transparent -rotate-45" />
        </div>

        {/* ── 3. Clavo Industrial JAGER Penetrando la Madera ── */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            bottom: 104,
            left: '50%',
            marginLeft: -4,
            animation: 'nailDrive 4.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards',
          }}
        >
          {/* Clavo de acero Ring Shank */}
          <svg width="8" height="38" viewBox="0 0 8 38" fill="none">
            {/* Cabeza del clavo */}
            <ellipse cx="4" cy="2" rx="4" ry="1.5" fill="#EAEAEA" stroke="#444" strokeWidth="0.5" />
            {/* Vástago anillado */}
            <rect x="2.5" y="2" width="3" height="32" fill="#D4D4D4" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1="2" y1={8 + i * 3.5} x2="6" y2={8 + i * 3.5} stroke="#888" strokeWidth="0.8" />
            ))}
            {/* Punta */}
            <polygon points="2.5,34 5.5,34 4,38" fill="#AAA" />
          </svg>
        </div>

        {/* ── 4. Paleta de Madera para Paletizado (Viga y tablón industrial) ── */}
        <div
          className="absolute z-0 flex flex-col items-center pointer-events-none"
          style={{
            bottom: 30,
            animation: 'palletShake 4.2s ease forwards',
          }}
        >
          {/* Tablón superior de pino para paleta */}
          <div
            className="relative rounded-sm overflow-hidden shadow-2xl"
            style={{
              width: 320,
              height: 48,
              background: 'linear-gradient(180deg, #A88250 0%, #8A6434 50%, #6E4E26 100%)',
              border: '1px solid #5C3E1C',
              boxShadow: '0 12px 30px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.15)',
            }}
          >
            {/* Vetas y textura de madera */}
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.3)_42px,transparent_44px)]" />
            <div className="absolute top-2 inset-x-0 h-px bg-white opacity-10" />
            <div className="absolute bottom-2 inset-x-0 h-px bg-black opacity-30" />
            
            {/* Punto de impacto central donde entra el clavo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#3A220F] opacity-70 rounded-full blur-[0.5px]" />
          </div>

          {/* Bloques de soporte de la paleta (Tacos de madera) */}
          <div className="flex justify-between w-[300px] mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: 60,
                  height: 24,
                  background: 'linear-gradient(180deg, #6E4E26 0%, #4E3416 100%)',
                  border: '1px solid #3E280E',
                }}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ESCENA 2: REVELACIÓN DEL LOGO OFICIAL JAGER
            ══════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-40 pointer-events-none px-6"
          style={{
            animation: 'logoReveal 4.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
          <div className="transform scale-110 sm:scale-125">
            <JagerLogo width={280} />
          </div>

          {/* Tagline de alto impacto */}
          <div className="flex flex-col items-center gap-1.5 mt-1">
            <p className="text-[11px] sm:text-xs text-[#EBEBEB] uppercase tracking-[0.4em] font-bold">
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
