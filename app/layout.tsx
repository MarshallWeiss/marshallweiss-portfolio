import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import PageBackground from '@/components/PageBackground';
import Footer from '@/components/Footer';
import '../styles/globals.css';
import '../styles/portfolio.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const rightSlab = localFont({
  src: '../public/fonts/PPRightSlab-Medium.woff2',
  variable: '--font-right-slab',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.marshallweiss.com'),
  title: {
    default: 'Marshall Weiss · Product designer',
    template: '%s · Marshall Weiss',
  },
  description:
    'Marshall Weiss is a product designer at El Confidencial in Madrid. Case studies on the newspaper’s CMS, its homepage and its subscriptions, plus a few side projects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${rightSlab.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <PageBackground />
        <CustomCursor />
        <Navigation />
        <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
