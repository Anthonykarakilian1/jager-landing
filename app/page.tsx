'use client';

import dynamic from 'next/dynamic';

const ForkliftIntro = dynamic(() => import('@/components/ui/ForkliftIntro'), { ssr: false });
const HeroScroll    = dynamic(() => import('@/components/ui/HeroScroll'),    { ssr: false });

/* ── Layout constants ── */
const CONTENT_W  = 560;   // narrow centered column for text
const GRID_W     = 700;   // wider for card grids
const SECTION_PX = 24;    // horizontal padding inside sections

const center = (maxWidth: number) => ({
  maxWidth,
  marginLeft:  'auto',
  marginRight: 'auto',
  paddingLeft:  SECTION_PX,
  paddingRight: SECTION_PX,
} as const);

/* ── Data ── */
const FEATURES = [
  { title: 'Tecnología Alemana',    body: 'Fabricados bajo estándares de ingeniería alemana. Décadas de I+D en sistemas de fijación industrial aplicadas a cada pieza.' },
  { title: 'Galvanizado Premium',   body: 'Recubrimiento galvánico de alta densidad. Protección frente a la oxidación y el desgaste en operaciones de alto rendimiento.' },
  { title: 'Paletizado Industrial', body: 'Compatibilidad garantizada con las principales clavadoras de alta velocidad del mercado industrial.' },
  { title: 'Alta Productividad',    body: 'Rollos de 4,000 pcs y cajas de 5,000 pcs reducen las interrupciones de recarga y maximizan la producción por turno.' },
] as const;

const STATS = [
  { value: '4,000', label: 'Clavos / rollo'  },
  { value: '5,000', label: 'Grapas / caja'   },
  { value: '2',     label: 'Líneas'           },
  { value: '100%',  label: 'Made in Germany'  },
] as const;

/* ── Section wrapper ── */
function Section({ id, children, bg = '#0C0C0C', border = false, py = 80 }: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
  border?: boolean;
  py?: number;
}) {
  return (
    <section
      id={id}
      style={{
        background:   bg,
        paddingTop:   py,
        paddingBottom: py,
        borderTop:    border ? '1px solid #1C1C1C' : 'none',
        scrollMarginTop: 64,
      }}
    >
      {children}
    </section>
  );
}

/* ── Centered section heading ── */
function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <p style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#B80000', marginBottom: 12 }}>
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)', color: '#EBEBEB', lineHeight: 1.1 }}>
        {title}
      </h2>
      {sub && (
        <p style={{ fontSize: 13, color: '#444', marginTop: 12, lineHeight: 1.7, maxWidth: 340, marginLeft: 'auto', marginRight: 'auto' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ background: '#0C0C0C', isolation: 'isolate' }}>

      <ForkliftIntro />

      {/* ── Hero scroll ── */}
      <section id="productos" style={{ isolation: 'isolate' }}>
        <HeroScroll />
      </section>

      {/* ── Marquee ── */}
      <div style={{ background: '#111', borderTop: '1px solid #1C1C1C', borderBottom: '1px solid #1C1C1C', overflow: 'hidden', paddingTop: 10, paddingBottom: 10 }}>
        <div className="marquee" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...Array(10)].map((_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {['Coil Nails', 'Grapas Galvanizadas', 'Tecnología Alemana', 'Industrial'].map((t) => (
                <span key={t} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#2A2A2A', padding: '0 28px' }}>
                  {t}
                  <span style={{ display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: 'rgba(184,0,0,0.3)', marginLeft: 28, verticalAlign: 'middle' }} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <Section bg="#111" border>
        <div style={center(CONTENT_W)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', paddingTop: 32, paddingBottom: 32,
                  borderRight: i < STATS.length - 1 ? '1px solid #1C1C1C' : 'none',
                }}
              >
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#EBEBEB', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#444', marginTop: 6 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Features ── */}
      <Section id="ventajas" py={96}>
        <div style={center(GRID_W)}>
          <Heading
            eyebrow="¿Por qué JAGER?"
            title="Ventajas del producto"
            sub="Ingeniería de precisión para operaciones que no admiten fallas."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                style={{
                  background: '#111', border: '1px solid #1C1C1C',
                  borderRadius: 12, padding: 28, textAlign: 'center',
                }}
              >
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#1C1C1C', lineHeight: 1, marginBottom: 10 }}>
                  0{i + 1}
                </p>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#EBEBEB', marginBottom: 10 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 12, color: '#444', lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── German Technology ── */}
      <Section bg="#111" border py={96}>
        <div style={{ ...center(CONTENT_W), textAlign: 'center' }}>

          {/* Flag */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3, overflow: 'hidden', width: 48 }}>
              <div style={{ height: 10, background: '#1A1A1A' }} />
              <div style={{ height: 10, background: '#B80000' }} />
              <div style={{ height: 10, background: '#C8960C' }} />
            </div>
          </div>

          <p style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#B80000', marginBottom: 12 }}>
            Origen certificado
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px,4vw,40px)', color: '#EBEBEB', lineHeight: 1.2, marginBottom: 20 }}>
            Tecnología alemana<br />aplicada al paletizado
          </h2>
          <p style={{ fontSize: 13, color: '#444', lineHeight: 1.8, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            JAGER es el resultado de décadas de ingeniería alemana aplicada al paletizado
            industrial. Cada clavo y cada grapa refleja un estándar de precisión que
            impone respeto en la línea de producción.
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 36 }}>
            {['#1A1A1A', '#B80000', '#C8960C'].map((c) => (
              <div key={c} style={{ width: 20, height: 2, background: c, borderRadius: 1 }} />
            ))}
          </div>
        </div>
      </Section>

    </div>
  );
}
