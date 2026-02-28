import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
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
      <body className="font-sans cursor-none">
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <footer className="bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} Marshall Weiss</p>
            <div className="flex items-center gap-5">
              <a href="mailto:marshallweiss94@gmail.com" className="hover:text-gray-600 transition-colors">marshallweiss94@gmail.com</a>
              <a href="https://www.linkedin.com/in/marshallweissdesign/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
