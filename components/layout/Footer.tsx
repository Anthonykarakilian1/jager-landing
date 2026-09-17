'use client';

import JagerLogo from '@/components/ui/JagerLogo';

export default function Footer() {
  return (
    <footer
      id="nosotros"
      style={{
        background: '#0C0C0C',
        borderTop: '1px solid #1C1C1C',
        scrollMarginTop: 64,
      }}
    >
      <div style={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', padding: '80px 24px', textAlign: 'center' }}>

        {/* Logo centered */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <JagerLogo width={120} />
        </div>

        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, maxWidth: 340, marginLeft: 'auto', marginRight: 'auto', marginBottom: 32 }}>
          Clavos en rollo y grapas galvanizadas para la industria
          del paletizado. Tecnología alemana de precisión.
        </p>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 32px', marginBottom: 36 }}>
          {[
            { href: '#',          label: 'Inicio'   },
            { href: '#productos', label: 'Productos'},
            { href: '#ventajas',  label: 'Ventajas' },
            { href: '#nosotros',  label: 'Nosotros' },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: 12, color: '#444', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EBEBEB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Flag */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 10 }}>
          {['#1A1A1A', '#B80000', '#C8960C'].map((c) => (
            <div key={c} style={{ width: 20, height: 2.5, background: c, borderRadius: 1 }} />
          ))}
        </div>
        <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#2A2A2A' }}>
          German Engineering
        </p>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #1C1C1C', padding: '14px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#252525' }}>
          © {new Date().getFullYear()} JAGER Tecnología Alemana. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
