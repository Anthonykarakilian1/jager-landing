'use client';

import { useEffect, useState } from 'react';
import JagerLogo from '@/components/ui/JagerLogo';

const LINKS = [
  { href: '#productos', label: 'Productos' },
  { href: '#ventajas',  label: 'Ventajas'  },
  { href: '#nosotros',  label: 'Nosotros'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(12,12,12,0.96)' : 'transparent',
          borderBottom: scrolled ? '1px solid #1C1C1C' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div style={{ maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', padding: '0 24px' }}>
          <div className="flex items-center justify-between h-16">

            <a href="#" aria-label="JAGER inicio">
              <JagerLogo width={125} />
            </a>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-10">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#555] hover:text-[#EBEBEB] transition-colors duration-200 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#B80000] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Mini flag + hamburger */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col gap-[2px]" aria-hidden>
                {['#1A1A1A', '#B80000', '#C8960C'].map((c) => (
                  <div key={c} style={{ width: 18, height: 2, background: c, borderRadius: 1 }} />
                ))}
              </div>

              <button
                className="md:hidden p-1 flex flex-col gap-[5px]"
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              >
                <span
                  className="block h-px w-5 transition-all duration-300 bg-[#EBEBEB] origin-center"
                  style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }}
                />
                <span
                  className="block h-px bg-[#B80000] transition-all duration-200"
                  style={{ width: open ? 0 : 14, opacity: open ? 0 : 1 }}
                />
                <span
                  className="block h-px w-5 transition-all duration-300 bg-[#EBEBEB] origin-center"
                  style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col pt-20 px-8 pb-10"
          style={{ background: 'rgba(12,12,12,0.98)', backdropFilter: 'blur(24px)' }}
        >
          <nav className="flex flex-col gap-1 mt-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-bebas text-4xl text-[#EBEBEB] hover:text-[#B80000] transition-colors py-3 border-b border-[#1C1C1C]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-3">
            <div className="flex flex-col gap-[2px]">
              {['#1A1A1A', '#B80000', '#C8960C'].map((c) => (
                <div key={c} style={{ width: 16, height: 2, background: c, borderRadius: 1 }} />
              ))}
            </div>
            <span className="text-[9px] text-[#333] uppercase tracking-widest">
              German Technology
            </span>
          </div>
        </div>
      )}
    </>
  );
}
