import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JAGER | Clavos y Grapas para Paletas Industriales — Tecnología Alemana',
  description:
    'Distribuidor de clavos en rollo (coil nails) y grapas galvanizadas JAGER para paletizado industrial. Tecnología alemana de precisión milimétrica.',
  keywords: ['clavos para paletas', 'grapas para paletas', 'coil nails', 'paletizado industrial', 'tecnología alemana', 'JAGER'],
  openGraph: {
    title: 'JAGER | Tecnología Alemana — Clavos y Grapas Industriales',
    description: 'Clavos en rollo y grapas galvanizadas JAGER para paletas de carga. Precisión industrial.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body style={{ background: '#080604', fontFamily: 'var(--font-inter)' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
