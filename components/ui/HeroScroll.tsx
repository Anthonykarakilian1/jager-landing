'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import JagerLogo from '@/components/ui/JagerLogo';
import { CoilNailSVG, StapleSVG } from '@/components/ui/ProductIllustrations';

/* ── Catálogo de Productos Oficial JAGER ── */
const PRODUCTS = [
  {
    id: 1,
    type: 'CLAVOS',
    name: 'Rollos de Clavos',
    eng: 'Coil Nails',
    size: '2.5 × 57 mm',
    diam: '2.5 mm',
    length: '57 mm',
    qty: '4,000 pcs / rollo',
    tag: 'Paletizado pesado de alta resistencia',
    color: '#FF4D4F', // Rojo industrial luminoso
    kind: 'nail' as const,
    num: '01',
  },
  {
    id: 2,
    type: 'CLAVOS',
    name: 'Rollos de Clavos',
    eng: 'Coil Nails',
    size: '2.0 × 57 mm',
    diam: '2.0 mm',
    length: '57 mm',
    qty: '4,000 pcs / rollo',
    tag: 'Alta penetración y precisión',
    color: '#FFC53D', // Dorado/Ámbar luminoso
    kind: 'nail' as const,
    num: '02',
  },
  {
    id: 3,
    type: 'GRAPAS',
    name: 'Grapas Galvanizadas',
    eng: 'Galvanized Staples',
    size: '90 × 25 mm',
    diam: '90 mm',
    length: '25 mm',
    qty: '5,000 pcs / caja',
    tag: 'Fijación estándar y embalaje industrial',
    color: '#FF7A45', // Salmón/Naranja oficial de empaque
    kind: 'staple' as const,
    num: '03',
  },
  {
    id: 4,
    type: 'GRAPAS',
    name: 'Grapas Galvanizadas',
    eng: 'Galvanized Staples',
    size: '100 × 45 mm',
    diam: '100 mm',
    length: '45 mm',
    qty: '10,000 pcs / caja',
    tag: 'Estructural de alta capacidad (12.3 kg)',
    color: '#36CFC9', // Cian galvanizado brillante
    kind: 'staple' as const,
    num: '04',
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
  const specs =
    product.kind === 'nail'
      ? [
          { label: 'Medida Total',  value: product.size },
          { label: 'Diámetro Caña', value: `Ø ${product.diam}` },
          { label: 'Longitud',      value: product.length },
          { label: 'Presentación',  value: product.qty },
        ]
      : [
          { label: 'Medida Total',  value: product.size },
          { label: 'Ancho Corona',  value: product.diam },
          { label: 'Largo de Pata', value: product.length },
          { label: 'Presentación',  value: product.qty },
        ];

  return (
    <motion.div
      style={{ opacity, y, display, zIndex: 10 }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 pointer-events-auto"
    >
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14"
      >
        {/* ── COLUMNA 1: Datos Técnicos y Especificaciones ── */}
        <div className="flex flex-col gap-4 w-full md:w-1/2 text-left items-start">
          
          {/* Badge de Categoría con color de acento vibrante */}
          <div className="flex items-center gap-2.5">
            <span
              className="text-[9.5px] uppercase tracking-[0.35em] font-bold px-3 py-1 rounded"
              style={{
                color: product.color,
                background: `${product.color}20`,
                border: `1px solid ${product.color}50`,
              }}
            >
              {product.type}
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#777]">
              {product.eng}
            </span>
          </div>

          {/* Nombre y Tagline */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-1 font-mono">
              {product.num} / 04
            </p>
            <h2 className="font-bebas text-4xl sm:text-5xl text-[#FFFFFF] leading-none">
              {product.name}
            </h2>
            <p
              className="text-[10.5px] mt-1.5 uppercase tracking-[0.22em] font-semibold"
              style={{ color: product.color }}
            >
              {product.tag}
            </p>
          </div>

          {/* Grid de especificaciones técnicas con tipografía legible y proporcionada */}
          <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
            {specs.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3 flex flex-col justify-center transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#888888] font-medium mb-1">
                  {s.label}
                </span>
                <span className="font-sans text-sm sm:text-[14.5px] font-semibold text-[#FFFFFF] tracking-tight leading-snug">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Sello de tecnología */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flag-bar w-[2px] h-3.5 rounded-sm flex-shrink-0" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#666]">
              German Technology · Tecnología Que Impone
            </span>
          </div>
        </div>

        {/* ── COLUMNA 2: Plano Técnico Vectorial con Cotas ── */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <div className="relative flex items-center justify-center">
            {/* Glow sutil con el color correspondiente */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-[0.10] pointer-events-none"
              style={{ background: product.color, transform: 'scale(1.2)' }}
            />
            {product.kind === 'nail' ? (
              <CoilNailSVG
                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
                diam={product.diam}
                length={product.length}
                accentColor={product.color}
              />
            ) : (
              <StapleSVG
                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
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
    <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 pointer-events-none">
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
