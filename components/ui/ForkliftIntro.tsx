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
        
        {/* ── 1. CLAVO DE ACERO INDUSTRIAL JAGER (HERO PROTAGONISTA) ── */}
        <div
          className="absolute z-25 pointer-events-none flex items-center"
          style={{
            bottom: 86,
            left: '50%',
            marginLeft: -10,
            animation: 'proNailMotion 4.6s cubic-bezier(0.2, 0.9, 0.2, 1) forwards',
          }}
        >
          {/* Clavo de alta definición */}
          <div className="relative">
            <svg
              width="20"
              height="80"
              viewBox="0 0 20 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_14px_rgba(255,255,255,0.6)]"
            >
              <defs>
                {/* Gradiente cromado para la cabeza del clavo */}
                <linearGradient id="heroNailHeadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4A4A4A" />
                  <stop offset="20%" stopColor="#D8D8D8" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="80%" stopColor="#A8A8A8" />
                  <stop offset="100%" stopColor="#3A3A3A" />
                </linearGradient>

                {/* Gradiente de acero industrial brillante para el vástago */}
                <linearGradient id="heroNailShankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2D3033" />
                  <stop offset="18%" stopColor="#8A929A" />
                  <stop offset="42%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#A2ABB4" />
                  <stop offset="100%" stopColor="#25272B" />
                </linearGradient>

                {/* Brillo de destello de luz sobre el clavo */}
                <linearGradient id="heroNailShimmer" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Cabeza circular biselada con grabado antideslizante */}
              <ellipse cx="10" cy="4" rx="9.5" ry="3.2" fill="url(#heroNailHeadGrad)" stroke="#222" strokeWidth="0.8" />
              <path d="M1 4 C1 6 19 6 19 4 L16 8.5 C16 9.5 4 9.5 4 8.5 Z" fill="#26282B" />
              <line x1="5" y1="4" x2="15" y2="4" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />

              {/* Cuello superior liso de alta resistencia */}
              <rect x="6.8" y="8" width="6.4" height="9" fill="url(#heroNailShankGrad)" />
              <line x1="9.2" y1="8" x2="9.2" y2="17" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.9" />

              {/* Ranuras anilladas Ring Shank (agarre mecánico extremo) */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                const yPos = 17 + i * 4.2;
                return (
                  <g key={i}>
                    {/* Cono de agarre invertido del anillo */}
                    <path
                      d={`M5.6 ${yPos + 1.2} L14.4 ${yPos + 1.2} L13.2 ${yPos + 3.8} L6.8 ${yPos + 3.8} Z`}
                      fill="url(#heroNailShankGrad)"
                      stroke="#1A1C1E"
                      strokeWidth="0.4"
                    />
                    {/* Línea de brillo specular */}
                    <line x1="9.2" y1={yPos + 1.2} x2="11.2" y2={yPos + 1.2} stroke="#FFFFFF" strokeWidth="0.9" opacity="0.95" />
                    {/* Sombra de retención inferior */}
                    <line x1="6.8" y1={yPos + 3.8} x2="13.2" y2={yPos + 3.8} stroke="#111" strokeWidth="0.5" />
                  </g>
                );
              })}

              {/* Tramo liso inferior y punta de diamante cuadrangular */}
              <rect x="6.8" y="67" width="6.4" height="4" fill="url(#heroNailShankGrad)" />
              <polygon points="6.8,71 13.2,71 10,79" fill="url(#heroNailShankGrad)" stroke="#333" strokeWidth="0.5" />
              <line x1="10" y1="71" x2="10" y2="78" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.9" />
            </svg>
          </div>

          {/* Badge técnico flotante que resalta la calidad del clavo */}
          <div
            className="absolute left-7 whitespace-nowrap bg-[#121212]/90 border border-[#2D2D2D] rounded px-2.5 py-1 shadow-xl flex items-center gap-2"
            style={{
              animation: 'proBadgeReveal 4.6s ease forwards',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D4F] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-[#FFFFFF] tracking-wider uppercase font-mono">
                JAGER RING SHANK
              </span>
              <span className="text-[7.5px] text-[#888888] tracking-widest font-mono">
                2.5 × 57 MM • ACERO INDUSTRIAL
              </span>
            </div>
          </div>
        </div>

        {/* ── 2. PISTOLA NEUMÁTICA DE CLAVOS INDUSTRIAL JAGER (ILUSTRACIÓN VECTORIAL HD) ── */}
        {/* Diseñada meticulosamente a partir del modelo neumático de paletizado de referencia */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            bottom: 86,
            left: '50%',
            marginLeft: -105,
            animation: 'proGunMotion 4.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            transformOrigin: '105px 230px',
          }}
        >
          <svg
            width="270"
            height="235"
            viewBox="0 0 270 235"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)]"
          >
            <defs>
              {/* Tapa superior rojo industrial JAGER */}
              <linearGradient id="gunRedCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E52B30" />
                <stop offset="35%" stopColor="#C51E24" />
                <stop offset="80%" stopColor="#8A0F13" />
                <stop offset="100%" stopColor="#5E080B" />
              </linearGradient>

              {/* Cuerpo de fundición de aluminio / titanio oscuro */}
              <linearGradient id="gunChassisDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3C4148" />
                <stop offset="30%" stopColor="#282C32" />
                <stop offset="70%" stopColor="#1B1E22" />
                <stop offset="100%" stopColor="#101214" />
              </linearGradient>

              {/* Tambor cargador oscurecido con textura */}
              <linearGradient id="gunDrumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#26282B" />
                <stop offset="45%" stopColor="#181A1C" />
                <stop offset="100%" stopColor="#0D0E10" />
              </linearGradient>

              {/* Acero mecanizado de alta precisión para la nariz */}
              <linearGradient id="gunSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4A4F56" />
                <stop offset="30%" stopColor="#C8CFD8" />
                <stop offset="60%" stopColor="#EAF0F8" />
                <stop offset="85%" stopColor="#9AA2AD" />
                <stop offset="100%" stopColor="#3B4047" />
              </linearGradient>

              {/* Empuñadura de goma vulcanizada */}
              <linearGradient id="gunGripGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#222426" />
                <stop offset="50%" stopColor="#151618" />
                <stop offset="100%" stopColor="#0B0C0D" />
              </linearGradient>
            </defs>

            {/* Sombra de contacto en la base */}
            <ellipse cx="105" cy="228" rx="45" ry="6" fill="#000000" opacity="0.6" />

            {/* ═══════════════════════════════════════════════════
                A. CARGADOR DE TAMBOR COIL (MAGAZINE INCLINADO)
                ═══════════════════════════════════════════════════ */}
            <g id="coil-magazine">
              {/* Soporte metálico posterior que fija el tambor al mango */}
              <path d="M60 145 L150 185 L144 195 L52 154 Z" fill="#1C1E20" stroke="#33373D" strokeWidth="1.2" />

              {/* Carcasa cilíndrica del tambor porta-rollos */}
              <ellipse cx="62" cy="130" rx="46" ry="46" fill="url(#gunDrumGrad)" stroke="#383C42" strokeWidth="2.5" />
              <ellipse cx="62" cy="130" rx="36" ry="36" fill="#121315" stroke="#25272B" strokeWidth="1.5" />

              {/* Rollo interno visible de clavos electro-soldados en alambre dorado */}
              <circle cx="62" cy="130" rx="27" fill="#0A0B0C" stroke="#B80000" strokeWidth="0.8" strokeDasharray="4 3" />
              
              {/* Espiral de cabezas de clavos dorados en el carrete */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const nx1 = 62 + 20 * Math.cos(rad);
                const ny1 = 130 + 20 * Math.sin(rad);
                const nx2 = 62 + 12 * Math.cos(rad + 0.25);
                const ny2 = 130 + 12 * Math.sin(rad + 0.25);
                return (
                  <g key={deg}>
                    <circle cx={nx1} cy={ny1} r="2.4" fill="#FFC53D" stroke="#B37400" strokeWidth="0.5" />
                    <circle cx={nx2} cy={ny2} r="1.8" fill="#E5A020" opacity="0.9" />
                  </g>
                );
              })}

              {/* Núcleo central del eje del tambor con tornillo de ajuste */}
              <circle cx="62" cy="130" rx="6" ry="6" fill="#2E3238" stroke="#4B5058" strokeWidth="1.2" />
              <circle cx="62" cy="130" rx="2.5" ry="2.5" fill="#151618" />

              {/* Pestillo de liberación rápida del cargador */}
              <rect x="16" y="122" width="10" height="16" rx="2.5" fill="#C51E24" stroke="#3A080A" strokeWidth="1" />
              <line x1="19" y1="126" x2="23" y2="126" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />
              <line x1="19" y1="130" x2="23" y2="130" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />

              {/* Carril de alimentación de clavos desde el tambor a la nariz */}
              <path d="M88 148 L96 148 L96 112 L78 112 Z" fill="#1D2024" stroke="#33373D" strokeWidth="1" />
            </g>

            {/* ═══════════════════════════════════════════════════
                B. EMPUÑADURA ERGONÓMICA DE GOMA Y TOMA DE AIRE
                ═══════════════════════════════════════════════════ */}
            <g id="handle-and-air">
              {/* Estructura principal de la empuñadura */}
              <path
                d="M125 65 L175 105 C186 114 188 128 178 148 L160 186 C155 196 144 200 134 200 L122 200 L112 148 L114 78 Z"
                fill="url(#gunGripGrad)"
                stroke="#2B2F35"
                strokeWidth="1.5"
              />

              {/* Textura estriada de agarre antideslizante con acentos rojos */}
              <g opacity="0.9">
                <path d="M140 115 L165 135" stroke="#C51E24" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M135 133 L160 153" stroke="#C51E24" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M130 151 L155 171" stroke="#C51E24" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M126 169 L150 189" stroke="#C51E24" strokeWidth="2.8" strokeLinecap="round" />
              </g>

              {/* Guarda-gatillo metálico */}
              <path d="M106 88 C118 88 126 95 126 112 C126 122 118 128 106 128" stroke="#3C4148" strokeWidth="3" fill="none" strokeLinecap="round" />
              
              {/* Gatillo de aleación plateada de doble acción */}
              <path d="M112 94 C120 94 122 102 118 112 L110 116" stroke="url(#gunSteelGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" />

              {/* Acople rápido neumático industrial NPT en la base */}
              <rect x="124" y="200" width="16" height="12" rx="2" fill="url(#gunSteelGrad)" stroke="#222" strokeWidth="0.8" />
              <rect x="127" y="212" width="10" height="8" rx="1.5" fill="#E5A93C" stroke="#222" strokeWidth="0.6" />
              {/* Manguera de aire comprimido de alta presión */}
              <path d="M132 220 C132 230 155 232 155 240 C155 246 142 248 142 254" stroke="#181A1C" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>

            {/* ═══════════════════════════════════════════════════
                C. CILINDRO PRINCIPAL Y TAPA ROJA (ENGINE / PISTON)
                ═══════════════════════════════════════════════════ */}
            <g id="main-cylinder">
              {/* Carcasa del cilindro de fundición grafito */}
              <rect x="72" y="38" width="66" height="80" rx="8" fill="url(#gunChassisDarkGrad)" stroke="#3A3E45" strokeWidth="1.8" />
              {/* Nervaduras de refuerzo lateral */}
              <line x1="74" y1="52" x2="136" y2="52" stroke="#4D535D" strokeWidth="1.2" opacity="0.6" />
              <line x1="74" y1="108" x2="136" y2="108" stroke="#16181A" strokeWidth="1.5" />

              {/* Placa metálica lateral con logo JAGER grabado */}
              <rect x="78" y="60" width="54" height="26" rx="4" fill="#141618" stroke="#2D3136" strokeWidth="1" />
              <text x="105" y="77" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="15" fill="#F0F0F0" letterSpacing="2.5" fontWeight="bold">
                JAGER
              </text>
              {/* Franja bandera alemana en la placa */}
              <rect x="86" y="80" width="12.6" height="2" fill="#1A1A1A" />
              <rect x="98.6" y="80" width="12.6" height="2" fill="#C51E24" />
              <rect x="111.2" y="80" width="12.6" height="2" fill="#FFC53D" />

              {/* ── TAPA SUPERIOR ROJA DE LA REFERENCIA (CYLINDER CAP) ── */}
              {/* Anillo de junta de estanqueidad plateado */}
              <rect x="70" y="34" width="70" height="5" rx="2" fill="url(#gunSteelGrad)" stroke="#222" strokeWidth="0.8" />

              {/* Cúpula roja aerodinámica con nervios */}
              <path
                d="M68 34 C68 20 76 14 105 14 C134 14 142 20 142 34 Z"
                fill="url(#gunRedCapGrad)"
                stroke="#5E080B"
                strokeWidth="1.5"
              />

              {/* Tornillos Allen hexagonales en la tapa roja */}
              <circle cx="76" cy="28" r="2.8" fill="#1A1C1E" stroke="url(#gunSteelGrad)" strokeWidth="0.8" />
              <circle cx="134" cy="28" r="2.8" fill="#1A1C1E" stroke="url(#gunSteelGrad)" strokeWidth="0.8" />

              {/* Deflector de escape de aire 360° en la cúspide */}
              <rect x="92" y="8" width="26" height="8" rx="3" fill="#16181A" stroke="#333" strokeWidth="1" />
              <line x1="96" y1="12" x2="114" y2="12" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* ═══════════════════════════════════════════════════
                D. NARIZ DE DISPARO Y SEGURO DE CONTACTO (NOSEPIECE)
                ═══════════════════════════════════════════════════ */}
            <g id="nosepiece-and-safety">
              {/* Cañón / Nariz de acero templado mecanizado */}
              <rect x="95" y="116" width="20" height="92" rx="2" fill="url(#gunSteelGrad)" stroke="#262A2E" strokeWidth="1.2" />
              
              {/* Ranuras de guía del perno percutor */}
              <line x1="105" y1="122" x2="105" y2="200" stroke="#22262B" strokeWidth="2.5" />
              <line x1="102" y1="130" x2="108" y2="130" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />
              <line x1="102" y1="160" x2="108" y2="160" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />

              {/* Varilla y resorte del seguro de contacto */}
              <rect x="92" y="140" width="4" height="60" rx="1.5" fill="#C51E24" />
              
              {/* Boquilla de contacto de seguridad que presiona la madera */}
              <rect x="91" y="206" width="28" height="14" rx="2.5" fill="#181A1C" stroke="#FFC53D" strokeWidth="1.8" />
              <rect x="96" y="210" width="18" height="6" rx="1" fill="#FFC53D" />
            </g>
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
