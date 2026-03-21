import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import PageBackground from '@/components/PageBackground';
import Footer from '@/components/Footer';
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
      <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
      <body className="font-sans cursor-none">
        <PageBackground />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
