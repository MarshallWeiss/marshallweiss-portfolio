import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '@/components/Navigation';
import '../styles/globals.css';

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
  title: 'Marshall Weiss - Product Designer',
  description: 'Portfolio of Marshall Weiss, product designer for El Confidencial',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${rightSlab.variable}`}>
      <body className="font-sans">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
