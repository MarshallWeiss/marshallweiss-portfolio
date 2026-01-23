import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import '../styles/globals.css';

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
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
