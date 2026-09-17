'use client';

import { useId } from 'react';

/*
  JagerLogo — Vectorizado exacto del logo oficial JAGER
  
  Símbolo (según dibujo y cajas de empaque oficiales):
    1. Dos circunferencias concéntricas con poca separación (doble anillo exterior)
    2. Barra horizontal sólida que cruza de lado a lado por el interior
    3. Disco/hub circular central sólido integrado con la barra
    4. Perforación/corte cuadrado central (hueco transparente que deja ver el fondo)
  
  Tipografía y detalles:
    · JAGER en tipografía industrial bold
    · TECNOLOGÍA ALEMANA alineado abajo
    · Bandera alemana (3 franjas horizontales: Schwarz / Rot / Gold)
*/
export default function JagerLogo({
  width = 200,
  className = '',
  color = '#EBEBEB',
  subColor = '#888888',
}: {
  width?: number;
  className?: string;
  color?: string;
  subColor?: string;
}) {
  const reactId = useId();
  const maskId = `jager-logo-mask-${reactId.replace(/:/g, '')}`;
  const clipId = `jager-inner-clip-${reactId.replace(/:/g, '')}`;

  // ViewBox: 280 x 72 (proporción original apaisada)
  const height = Math.round(width * (72 / 280));

  // Geometría del símbolo centrado en (36, 36)
  const cx = 36;
  const cy = 36;
  const rOuter = 29;     // Circunferencia 1 (exterior)
  const rInner = 24.5;   // Circunferencia 2 (interior, poca separación)
  const rHub   = 12.5;   // Hub circular central
  const sqSize = 8.5;    // Corte cuadrado central

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="JAGER Tecnología Alemana"
    >
      <defs>
        {/* Clip para que la barra horizontal no sobrepase el anillo interior */}
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={rInner} />
        </clipPath>

        {/* Máscara para perforar el cuadrado central (completamente transparente) */}
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="#FFFFFF" />
          <rect
            x={cx - sqSize / 2}
            y={cy - sqSize / 2}
            width={sqSize}
            height={sqSize}
            rx="1"
            fill="#000000"
          />
        </mask>
      </defs>

      {/* ════════════════════════════════════════════════════════
          SÍMBOLO JAGER
          ════════════════════════════════════════════════════════ */}
      <g>
        {/* 1. Circunferencia exterior */}
        <circle
          cx={cx}
          cy={cy}
          r={rOuter}
          stroke={color}
          strokeWidth="2.4"
          fill="none"
        />

        {/* 2. Circunferencia interior concéntrica (poca separación) */}
        <circle
          cx={cx}
          cy={cy}
          r={rInner}
          stroke={color}
          strokeWidth="2.2"
          fill="none"
        />

        {/* 3. Barra horizontal + Hub circular central con perforación cuadrada */}
        <g clipPath={`url(#${clipId})`} mask={`url(#${maskId})`}>
          {/* Barra horizontal que cruza de lado a lado */}
          <rect
            x={cx - rInner}
            y={cy - 5.5}
            width={rInner * 2}
            height="11"
            fill={color}
          />
          {/* Hub circular central */}
          <circle
            cx={cx}
            cy={cy}
            r={rHub}
            fill={color}
          />
        </g>
      </g>

      {/* ════════════════════════════════════════════════════════
          WORDMARK — JAGER
          ════════════════════════════════════════════════════════ */}
      <text
        x="82"
        y="46"
        fontFamily="'Bebas Neue', 'Arial Black', sans-serif"
        fontSize="48"
        fontWeight="bold"
        fill={color}
        letterSpacing="1.5"
      >
        JAGER
      </text>

      {/* ════════════════════════════════════════════════════════
          SUBTÍTULO — TECNOLOGÍA ALEMANA + BANDERA
          ════════════════════════════════════════════════════════ */}
      <text
        x="84"
        y="60"
        fontFamily="'Inter', 'Arial', sans-serif"
        fontSize="8.5"
        fontWeight="600"
        fill={subColor}
        letterSpacing="2.8"
      >
        TECNOLOGÍA ALEMANA
      </text>

      {/* Bandera alemana al lado del subtítulo */}
      <g transform="translate(236, 52)">
        <rect x="0" y="0" width="22" height="3" rx="0.5" fill="#1A1A1A" />
        <rect x="0" y="3.2" width="22" height="3" rx="0.5" fill="#CC0000" />
        <rect x="0" y="6.4" width="22" height="3" rx="0.5" fill="#FFCC00" />
      </g>
    </svg>
  );
}
