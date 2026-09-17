'use client';

import { useId } from 'react';

/* ══════════════════════════════════════════════════════════════════
   ILUSTRACIÓN TÉCNICA: CLAVO INDUSTRIAL (PALETIZADO)
   Enfocado exclusivamente en la longitud con plano técnico limpio.
   ══════════════════════════════════════════════════════════════════ */
export function CoilNailSVG({
  className = '',
  length = '57 mm',
  diam = '2.5 mm',
  accentColor = '#FF4D4F',
}: {
  className?: string;
  length?: string;
  diam?: string;
  accentColor?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const headGradId  = `nailHeadGrad-${uid}`;
  const shankGradId = `nailShankGrad-${uid}`;
  const pointGradId = `nailPointGrad-${uid}`;

  // Ajuste de grosor visual según el diámetro (2.0mm vs 2.5mm)
  const isThin = diam.includes('2.0') || diam.includes('2mm') || diam.includes('2 mm');
  const shankWidth = isThin ? 13 : 16;
  const shankX = 90 - shankWidth / 2;

  const topY = 28;
  const tipY = 208;

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Ilustración técnica de clavo industrial ${length}`}
    >
      <defs>
        {/* Gradiente metálico de alto contraste para la cabeza */}
        <linearGradient id={headGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#404040" />
          <stop offset="25%" stopColor="#A0A0A0" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#B0B0B0" />
          <stop offset="100%" stopColor="#303030" />
        </linearGradient>

        {/* Gradiente metálico brillante para el cuerpo de acero */}
        <linearGradient id={shankGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="20%" stopColor="#858585" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#9E9E9E" />
          <stop offset="100%" stopColor="#222222" />
        </linearGradient>

        {/* Gradiente para la punta de diamante */}
        <linearGradient id={pointGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E5E5" />
          <stop offset="50%" stopColor="#888888" />
          <stop offset="100%" stopColor="#1E1E1E" />
        </linearGradient>
      </defs>

      {/* Sombra de apoyo */}
      <ellipse cx="90" cy="208" rx="20" ry="4.5" fill="#000000" opacity="0.6" />

      {/* ── CUERPO DEL CLAVO (Acero industrial) ── */}
      <g>
        {/* Cabeza del clavo (Cap / Head) */}
        <ellipse cx="90" cy={topY} rx={isThin ? 18 : 22} ry="6" fill={`url(#${headGradId})`} stroke="#666" strokeWidth="0.8" />
        <path
          d={`M${90 - (isThin ? 18 : 22)} ${topY} C${90 - (isThin ? 18 : 22)} ${topY + 3.5} ${90 + (isThin ? 18 : 22)} ${topY + 3.5} ${90 + (isThin ? 18 : 22)} ${topY} L${shankX + shankWidth} ${topY + 4} C${shankX + shankWidth} ${topY + 6} ${shankX} ${topY + 6} ${shankX} ${topY + 4} Z`}
          fill="#3A3A3A"
        />

        {/* Cuello liso superior */}
        <rect x={shankX} y={topY + 4} width={shankWidth} height="24" fill={`url(#${shankGradId})`} />

        {/* Cuerpo anillado (Ring Shank para sujeción de alta resistencia) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const yPos = topY + 28 + i * 9.8;
          return (
            <g key={i}>
              <path
                d={`M${shankX - 1.5} ${yPos + 4} L${shankX + shankWidth + 1.5} ${yPos + 4} L${shankX + shankWidth} ${yPos + 8.8} L${shankX} ${yPos + 8.8} Z`}
                fill={`url(#${shankGradId})`}
                stroke="#1A1A1A"
                strokeWidth="0.5"
              />
              {/* Reflejo metálico en la cresta */}
              <line x1="88" y1={yPos + 4} x2="92" y2={yPos + 4} stroke="#FFFFFF" strokeWidth="1.2" opacity="0.95" />
            </g>
          );
        })}

        {/* Tramo final antes de la punta */}
        <rect x={shankX} y={tipY - 32} width={shankWidth} height="12" fill={`url(#${shankGradId})`} />

        {/* Punta de diamante (Diamond Point afilada) */}
        <polygon
          points={`${shankX},${tipY - 20} ${shankX + shankWidth},${tipY - 20} 90,${tipY}`}
          fill={`url(#${pointGradId})`}
          stroke="#555"
          strokeWidth="0.6"
        />
        <line x1="90" y1={tipY - 20} x2="90" y2={tipY} stroke="#222" strokeWidth="0.8" opacity="0.7" />
      </g>

      {/* ── COTA DE LONGITUD TOTAL (L) ── */}
      <g>
        {/* Líneas de referencia guía */}
        <line x1="114" y1={topY} x2="148" y2={topY} stroke="#555" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="92" y1={tipY} x2="148" y2={tipY} stroke="#555" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Línea de cota vertical */}
        <line
          x1="144"
          y1={topY + 7}
          x2="144"
          y2={tipY - 7}
          stroke={accentColor}
          strokeWidth="1.5"
        />

        {/* Flecha superior */}
        <polygon
          points={`144,${topY} 140,${topY + 8} 148,${topY + 8}`}
          fill={accentColor}
        />
        {/* Flecha inferior */}
        <polygon
          points={`144,${tipY} 140,${tipY - 8} 148,${tipY - 8}`}
          fill={accentColor}
        />

        {/* Placa métrica de Longitud */}
        <rect
          x="152"
          y="106"
          width="68"
          height="26"
          rx="4"
          fill="#141414"
          stroke={accentColor}
          strokeWidth="1.2"
        />
        <text
          x="186"
          y="123"
          textAnchor="middle"
          fontFamily="'Inter', monospace, sans-serif"
          fontSize="12"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="0.8"
        >
          {length}
        </text>
        <text
          x="186"
          y="142"
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="7.5"
          fontWeight="700"
          fill={accentColor}
          letterSpacing="1.2"
        >
          LONGITUD
        </text>
      </g>

      {/* Marca técnica Ring Shank lateral */}
      <text
        x="36"
        y="118"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize="7.5"
        fontWeight="600"
        fill="#666"
        letterSpacing="1.2"
        transform="rotate(-90, 36, 118)"
      >
        RING SHANK
      </text>
    </svg>
  );
}


/* ══════════════════════════════════════════════════════════════════
   ILUSTRACIÓN TÉCNICA: GRAPA INDUSTRIAL GALVANIZADA
   Con puntas afiladas en pico y cotas horizontales/verticales exactas.
   ══════════════════════════════════════════════════════════════════ */
export function StapleSVG({
  className = '',
  width = '90 mm',
  length = '25 mm',
  accentColor = '#FF7A45',
}: {
  className?: string;
  width?: string;
  length?: string;
  accentColor?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const galvGradId  = `stapleGalvGrad-${uid}`;
  const crownGradId = `stapleCrownGrad-${uid}`;

  // Proporción entre 90x25mm y 100x45mm
  const isLongLeg = length.includes('45');
  const legHeight = isLongLeg ? 94 : 68;
  const crownWidth = isLongLeg ? 116 : 104;
  const startX = 86 - crownWidth / 2;
  const legThickness = 12;
  const crownTopY = 96;
  const tipHeight = 12; // Altura del pico/punta
  const legBottomY = crownTopY + legHeight;
  const tipBottomY = legBottomY + tipHeight;

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Ilustración técnica de grapa galvanizada corona ${width} por ${length}`}
    >
      <defs>
        {/* Gradiente galvanizado brillante de alto contraste */}
        <linearGradient id={galvGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7E7E7E" />
          <stop offset="25%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#C8C8C8" />
          <stop offset="100%" stopColor="#555555" />
        </linearGradient>

        <linearGradient id={crownGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#B5B5B5" />
          <stop offset="100%" stopColor="#505050" />
        </linearGradient>
      </defs>

      {/* Sombra de la grapa */}
      <ellipse cx="86" cy={tipBottomY + 8} rx={crownWidth / 2 + 10} ry="5.5" fill="#000000" opacity="0.45" />

      {/* ── CUERPO DE LA GRAPA (Corona + Patas con Puntas en Pico) ── */}
      <g>
        {/* Tira en profundidad (pack de grapas en serie) */}
        {[8, 6, 4, 2].map((offset) => (
          <path
            key={offset}
            d={`M${startX + offset} ${crownTopY - offset} L${startX + crownWidth + offset} ${crownTopY - offset} L${startX + crownWidth + offset} ${legBottomY - offset} L${startX + crownWidth - legThickness / 2 + offset} ${tipBottomY - offset} L${startX + crownWidth - legThickness + offset} ${legBottomY - offset} L${startX + crownWidth - legThickness + offset} ${crownTopY + 12 - offset} L${startX + legThickness + offset} ${crownTopY + 12 - offset} L${startX + legThickness + offset} ${legBottomY - offset} L${startX + legThickness / 2 + offset} ${tipBottomY - offset} L${startX + offset} ${legBottomY - offset} Z`}
            fill="#262626"
            stroke="#161616"
            strokeWidth="0.8"
            opacity={0.5}
          />
        ))}

        {/* Corona superior (Crown) */}
        <rect
          x={startX}
          y={crownTopY}
          width={crownWidth}
          height="12"
          rx="1.5"
          fill={`url(#${crownGradId})`}
          stroke="#666"
          strokeWidth="0.8"
        />
        <line x1={startX + 4} y1={crownTopY + 2} x2={startX + crownWidth - 4} y2={crownTopY + 2} stroke="#FFFFFF" strokeWidth="1.2" opacity="0.85" />

        {/* Pata izquierda (Left Leg) */}
        <rect
          x={startX}
          y={crownTopY + 12}
          width={legThickness}
          height={legHeight - 12}
          fill={`url(#${galvGradId})`}
          stroke="#555"
          strokeWidth="0.8"
        />
        {/* Punta en pico izquierda (Chisel Point en V afilada) */}
        <polygon
          points={`${startX},${legBottomY} ${startX + legThickness / 2},${tipBottomY} ${startX + legThickness},${legBottomY}`}
          fill="#E5E5E5"
          stroke="#444"
          strokeWidth="0.8"
        />
        <line x1={startX + legThickness / 2} y1={legBottomY} x2={startX + legThickness / 2} y2={tipBottomY} stroke="#333" strokeWidth="0.6" opacity="0.6" />

        {/* Pata derecha (Right Leg) */}
        <rect
          x={startX + crownWidth - legThickness}
          y={crownTopY + 12}
          width={legThickness}
          height={legHeight - 12}
          fill={`url(#${galvGradId})`}
          stroke="#555"
          strokeWidth="0.8"
        />
        {/* Punta en pico derecha (Chisel Point en V afilada) */}
        <polygon
          points={`${startX + crownWidth - legThickness},${legBottomY} ${startX + crownWidth - legThickness / 2},${tipBottomY} ${startX + crownWidth},${legBottomY}`}
          fill="#E5E5E5"
          stroke="#444"
          strokeWidth="0.8"
        />
        <line x1={startX + crownWidth - legThickness / 2} y1={legBottomY} x2={startX + crownWidth - legThickness / 2} y2={tipBottomY} stroke="#333" strokeWidth="0.6" opacity="0.6" />
      </g>

      {/* ── LÍNEAS DE COTA TÉCNICA (VECTORES DIRECTOS DE PRECISIÓN) ── */}

      {/* 1. COTA DE ANCHO DE CORONA (Horizontal superior) */}
      <g>
        {/* Líneas de referencia verticales */}
        <line x1={startX} y1="62" x2={startX} y2={crownTopY - 2} stroke="#555" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1={startX + crownWidth} y1="62" x2={startX + crownWidth} y2={crownTopY - 2} stroke="#555" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Línea horizontal continua con cotas */}
        <line
          x1={startX + 8}
          y1="66"
          x2={startX + crownWidth - 8}
          y2="66"
          stroke={accentColor}
          strokeWidth="1.5"
        />

        {/* Flecha izquierda horizontal */}
        <polygon
          points={`${startX},66 ${startX + 8},62.5 ${startX + 8},69.5`}
          fill={accentColor}
        />
        {/* Flecha derecha horizontal */}
        <polygon
          points={`${startX + crownWidth},66 ${startX + crownWidth - 8},62.5 ${startX + crownWidth - 8},69.5`}
          fill={accentColor}
        />

        {/* Badge Ancho Corona */}
        <rect
          x="58"
          y="38"
          width="58"
          height="22"
          rx="3.5"
          fill="#141414"
          stroke={accentColor}
          strokeWidth="1.2"
        />
        <text
          x="87"
          y="53.5"
          textAnchor="middle"
          fontFamily="'Inter', monospace, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="0.8"
        >
          {width}
        </text>
        <text
          x="87"
          y="32"
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="7.5"
          fontWeight="700"
          fill={accentColor}
          letterSpacing="1.2"
        >
          ANCHO CORONA
        </text>
      </g>

      {/* 2. COTA DE LONGITUD DE PATA (Vertical lateral) */}
      <g>
        {/* Líneas de referencia horizontales */}
        <line x1={startX + crownWidth + 2} y1={crownTopY} x2={startX + crownWidth + 28} y2={crownTopY} stroke="#555" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1={startX + crownWidth + 2} y1={tipBottomY} x2={startX + crownWidth + 28} y2={tipBottomY} stroke="#555" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Línea vertical */}
        <line
          x1={startX + crownWidth + 22}
          y1={crownTopY + 8}
          x2={startX + crownWidth + 22}
          y2={tipBottomY - 8}
          stroke={accentColor}
          strokeWidth="1.5"
        />

        {/* Flecha superior vertical */}
        <polygon
          points={`${startX + crownWidth + 22},${crownTopY} ${startX + crownWidth + 18.5},${crownTopY + 8} ${startX + crownWidth + 25.5},${crownTopY + 8}`}
          fill={accentColor}
        />
        {/* Flecha inferior vertical */}
        <polygon
          points={`${startX + crownWidth + 22},${tipBottomY} ${startX + crownWidth + 18.5},${tipBottomY - 8} ${startX + crownWidth + 25.5},${tipBottomY - 8}`}
          fill={accentColor}
        />

        {/* Badge Longitud Pata */}
        <rect
          x={startX + crownWidth + 30}
          y={crownTopY + legHeight / 2 - 11}
          width="50"
          height="22"
          rx="3.5"
          fill="#141414"
          stroke={accentColor}
          strokeWidth="1.2"
        />
        <text
          x={startX + crownWidth + 55}
          y={crownTopY + legHeight / 2 + 4.5}
          textAnchor="middle"
          fontFamily="'Inter', monospace, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          {length}
        </text>
      </g>
    </svg>
  );
}
