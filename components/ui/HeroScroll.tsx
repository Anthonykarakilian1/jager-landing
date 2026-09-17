'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import JagerLogo from '@/components/ui/JagerLogo';
import { CoilNailSVG, StapleSVG } from '@/components/ui/ProductIllustrations';

/* ── Catálogo Oficial JAGER con Especificaciones Técnicas ── */
const PRODUCTS = [
  {
    id: 1,
    type: 'CLAVOS EN ROLLO',
    name: 'Rollos de Clavos',
    eng: 'Coil Nails',
    size: '2.5 × 57 mm',
    tag: 'Paletizado pesado de alta resistencia',
    color: '#FF4D4F', // Rojo industrial luminoso
    kind: 'nail' as const,
    num: '01',
    diam: '2.5 mm',
    length: '57 mm',
    specs: [
      { label: 'Medida Total',  value: '2.5 × 57 mm' },
      { label: 'Presentación',  value: '4,000 pcs / rollo' },
      { label: 'Tipo de Caña',  value: 'Ring Shank (Anillado)' },
      { label: 'Aplicación',    value: 'Paletizado Pesado' },
    ],
  },
  {
    id: 2,
    type: 'CLAVOS EN ROLLO',
    name: 'Rollos de Clavos',
    eng: 'Coil Nails',
    size: '2.0 × 57 mm',
    tag: 'Alta penetración y precisión',
    color: '#FFC53D', // Dorado/Ámbar luminoso
    kind: 'nail' as const,
    num: '02',
    diam: '2.0 mm',
    length: '57 mm',
    specs: [
      { label: 'Medida Total',  value: '2.0 × 57 mm' },
      { label: 'Presentación',  value: '4,000 pcs / rollo' },
      { label: 'Tipo de Caña',  value: 'Ring Shank (Anillado)' },
      { label: 'Aplicación',    value: 'Fijación y Ensamble' },
    ],
  },
  {
    id: 3,
    type: 'GRAPAS GALVANIZADAS',
    name: 'Grapas Galvanizadas',
    eng: 'Galvanized Staples',
    size: '90 × 25 mm',
    tag: 'Fijación estándar y embalaje industrial',
    color: '#FF7A45', // Salmón/Naranja oficial
    kind: 'staple' as const,
    num: '03',
    diam: '90 mm',
    length: '25 mm',
    specs: [
      { label: 'Corona × Largo', value: '90 × 25 mm' },
      { label: 'Presentación',   value: '5,000 pcs / caja' },
      { label: 'Tipo de Punta',  value: 'Puntas en Pico' },
      { label: 'Acabado',        value: 'Galvanizado Premium' },
    ],
  },
  {
    id: 4,
    type: 'GRAPAS GALVANIZADAS',
    name: 'Grapas Galvanizadas',
    eng: 'Galvanized Staples',
    size: '100 × 45 mm',
    tag: 'Estructural de alta capacidad (12.3 kg)',
    color: '#36CFC9', // Cian galvanizado
    kind: 'staple' as const,
    num: '04',
    diam: '100 mm',
    length: '45 mm',
    specs: [
      { label: 'Corona × Largo', value: '100 × 45 mm' },
      { label: 'Presentación',   value: '10,000 pcs (12.3 kg)' },
      { label: 'Tipo de Punta',  value: 'Puntas en Pico' },
      { label: 'Acabado',        value: 'Galvanizado Estructural' },
    ],
  },
] as const;

type Product = (typeof PRODUCTS)[number];

/* ── Diapositiva individual de Producto ── */
function ProductSlideItem({
  product,
  opacity,
  y,
  display,
}: {
  product: Product;
  opacity: any;
  y: any;
  display: any;
}) {
  return (
    <motion.div
      style={{ opacity, y, display, zIndex: 10 }}
      className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 pointer-events-auto"
    >
      <div
        style={{
          width: '100%',
          maxWidth: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12"
      >
        {/* ── COLUMNA 1: Ficha Técnica Estructurada y Limpia ── */}
        <div className="flex flex-col gap-3.5 w-full md:w-[52%] text-left items-start">
          
          {/* Header de producto con categoría y número */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span
                className="text-[9px] uppercase tracking-[0.3em] font-bold px-2.5 py-0.5 rounded"
                style={{
                  color: product.color,
                  background: `${product.color}18`,
                  border: `1px solid ${product.color}45`,
                }}
              >
                {product.type}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#666]">
                {product.eng}
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-[#666]">
              {product.num} / 04
            </span>
          </div>

          {/* Título y Tagline */}
          <div>
            <h2 className="font-bebas text-3xl sm:text-5xl text-[#FFFFFF] leading-none tracking-tight">
              {product.name}
            </h2>
            <p
              className="text-[10.5px] sm:text-xs mt-1 uppercase tracking-[0.2em] font-semibold"
              style={{ color: product.color }}
            >
              {product.tag}
            </p>
          </div>

          {/* ── PANEL DE ESPECIFICACIONES TÉCNICAS (DISEÑO UNIFICADO Y ELEGANTE) ── */}
          <div
            className="w-full rounded-xl overflow-hidden divide-y divide-[#222222]"
            style={{
              background: '#121212',
              border: '1px solid #242424',
            }}
          >
            {/* Fila 1: Medida Principal y Presentación */}
            <div className="grid grid-cols-2 divide-x divide-[#222222]">
              <div className="p-2.5 sm:p-3 flex flex-col justify-center">
                <span className="text-[8.5px] uppercase tracking-[0.18em] text-[#777] font-medium mb-0.5">
                  {product.specs[0].label}
                </span>
                <span className="font-sans text-xs sm:text-sm font-bold text-[#FFFFFF] tracking-tight">
                  {product.specs[0].value}
                </span>
              </div>
              <div className="p-2.5 sm:p-3 flex flex-col justify-center">
                <span className="text-[8.5px] uppercase tracking-[0.18em] text-[#777] font-medium mb-0.5">
                  {product.specs[1].label}
                </span>
                <span className="font-sans text-xs sm:text-sm font-bold text-[#FFFFFF] tracking-tight">
                  {product.specs[1].value}
                </span>
              </div>
            </div>

            {/* Fila 2: Propiedad Técnica y Aplicación */}
            <div className="grid grid-cols-2 divide-x divide-[#222222]">
              <div className="p-2.5 sm:p-3 flex flex-col justify-center">
                <span className="text-[8.5px] uppercase tracking-[0.18em] text-[#777] font-medium mb-0.5">
                  {product.specs[2].label}
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-[#D0D0D0] tracking-tight">
                  {product.specs[2].value}
                </span>
              </div>
              <div className="p-2.5 sm:p-3 flex flex-col justify-center">
                <span className="text-[8.5px] uppercase tracking-[0.18em] text-[#777] font-medium mb-0.5">
                  {product.specs[3].label}
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-[#D0D0D0] tracking-tight">
                  {product.specs[3].value}
                </span>
              </div>
            </div>
          </div>

          {/* Sello de tecnología alemana */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="flag-bar w-[2px] h-3.5 rounded-sm flex-shrink-0" />
            <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#555] font-medium">
              German Technology · Tecnología Que Impone
            </span>
          </div>
        </div>

        {/* ── COLUMNA 2: Plano Técnico Vectorial con Cotas ── */}
        <div className="flex items-center justify-center w-full md:w-[48%]">
          <div className="relative flex items-center justify-center">
            {/* Glow sutil con el color correspondiente */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-[0.12] pointer-events-none"
              style={{ background: product.color, transform: 'scale(1.15)' }}
            />
            {product.kind === 'nail' ? (
              <CoilNailSVG
                className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
                diam={product.diam}
                length={product.length}
                accentColor={product.color}
              />
            ) : (
              <StapleSVG
                className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
                width={product.diam}
                length={product.length}
                accentColor={product.color}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Navegador de Puntos Lateral ── */
function DotNav({ active }: { active: number }) {
  return (
    <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 pointer-events-none">
      {PRODUCTS.map((p, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: 5,
            height: i === active ? 22 : 5,
            background: i === active ? p.color : '#252525',
            boxShadow: i === active ? `0 0 8px ${p.color}80` : 'none',
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO SCROLL CONTROLLER
   ══════════════════════════════════════════════════════════════════ */
export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sv } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* 1. Transiciones de la Portada / Logo Inicial (se oculta en 0.16) */
  const logoOpacity = useTransform(sv, [0, 0.08, 0.15], [1, 1, 0], { clamp: true });
  const logoY       = useTransform(sv, [0, 0.15], ['0%', '-10%'], { clamp: true });
  const logoDisplay = useTransform(sv, (v) => (v >= 0.16 ? 'none' : 'flex'));

  /* 2. Transiciones exactas y aisladas para cada uno de los 4 productos */
  // Producto 1: Rollos de Clavos (0.17 a 0.37)
  const p0Opacity = useTransform(sv, [0.17, 0.21, 0.33, 0.37], [0, 1, 1, 0], { clamp: true });
  const p0Y       = useTransform(sv, [0.17, 0.21, 0.33, 0.37], [30, 0, 0, -30], { clamp: true });
  const p0Display = useTransform(sv, (v) => (v >= 0.165 && v < 0.375 ? 'flex' : 'none'));

  // Producto 2: Rollos de Clavos (0.37 a 0.57)
  const p1Opacity = useTransform(sv, [0.37, 0.41, 0.53, 0.57], [0, 1, 1, 0], { clamp: true });
  const p1Y       = useTransform(sv, [0.37, 0.41, 0.53, 0.57], [30, 0, 0, -30], { clamp: true });
  const p1Display = useTransform(sv, (v) => (v >= 0.365 && v < 0.575 ? 'flex' : 'none'));

  // Producto 3: Grapas Galvanizadas (0.57 a 0.77)
  const p2Opacity = useTransform(sv, [0.57, 0.61, 0.73, 0.77], [0, 1, 1, 0], { clamp: true });
  const p2Y       = useTransform(sv, [0.57, 0.61, 0.73, 0.77], [30, 0, 0, -30], { clamp: true });
  const p2Display = useTransform(sv, (v) => (v >= 0.565 && v < 0.775 ? 'flex' : 'none'));

  // Producto 4: Grapas Galvanizadas (0.77 a 0.98)
  const p3Opacity = useTransform(sv, [0.77, 0.81, 0.94, 0.98], [0, 1, 1, 0], { clamp: true });
  const p3Y       = useTransform(sv, [0.77, 0.81, 0.94, 0.98], [30, 0, 0, -30], { clamp: true });
  const p3Display = useTransform(sv, (v) => (v >= 0.765 ? 'flex' : 'none'));

  // Rastreo del producto activo para el dot indicator
  const [activeDot, setActiveDot] = useState(-1);
  const activeCalc = useTransform(sv, (v) => {
    if (v >= 0.77) return 3;
    if (v >= 0.57) return 2;
    if (v >= 0.37) return 1;
    if (v >= 0.17) return 0;
    return -1;
  });

  useEffect(() => activeCalc.on('change', setActiveDot), [activeCalc]);

  return (
    <div
      ref={containerRef}
      style={{ height: '550vh', position: 'relative', isolation: 'isolate' }}
    >
      {/* Marco Sticky */}
      <div
        className="sticky top-0 w-full"
        style={{
          height: '100svh',
          background: '#0C0C0C',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        {/* Fondo sutil con textura */}
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />

        {/* ════════════════════════════════════════════════════════
            PORTADA HERO INICIAL (Logo JAGER + Subtítulo)
            ════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: logoOpacity,
            y: logoY,
            display: logoDisplay,
            zIndex: 5,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="flag-bar w-[2px] h-4 rounded-sm" />
            <span className="text-[9px] text-[#555] uppercase tracking-[0.45em]">
              Tecnología Alemana
            </span>
            <div className="flag-bar w-[2px] h-4 rounded-sm" />
          </div>

          {/* Logo Principal Oficial */}
          <div>
            <JagerLogo width={280} />
          </div>

          {/* Tagline */}
          <p className="text-[#555] text-[11px] sm:text-xs uppercase tracking-[0.45em] text-center max-w-xs leading-relaxed">
            Clavos y grapas para paletas industriales
          </p>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#444] to-transparent" />
            <span className="text-[8px] text-[#444] uppercase tracking-[0.4em]">
              Scroll
            </span>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════
            SLIDES DE PRODUCTO (4 Productos Oficiales)
            ════════════════════════════════════════════════════════ */}
        <ProductSlideItem
          product={PRODUCTS[0]}
          opacity={p0Opacity}
          y={p0Y}
          display={p0Display}
        />
        <ProductSlideItem
          product={PRODUCTS[1]}
          opacity={p1Opacity}
          y={p1Y}
          display={p1Display}
        />
        <ProductSlideItem
          product={PRODUCTS[2]}
          opacity={p2Opacity}
          y={p2Y}
          display={p2Display}
        />
        <ProductSlideItem
          product={PRODUCTS[3]}
          opacity={p3Opacity}
          y={p3Y}
          display={p3Display}
        />

        {/* Indicador de puntos lateral con colores dinámicos */}
        {activeDot >= 0 && <DotNav active={activeDot} />}
      </div>
    </div>
  );
}
