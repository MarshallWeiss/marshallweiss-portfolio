'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const PAGE_COLORS: Record<string, string> = {
  '/': '#F7F5F2',
  '/case-studies': '#F7F5F2',
  '/thoughts': '#D6E4DE',
  '/current': '#EAD9C8',
  '/about': '#D4D8E8',
  '/experiments': '#E8E0C4',
  '/book-club': '#F7F5F2',
  '/contact': '#F7F5F2',
  '/tutorials': '#F7F5F2',
};

function getPageColor(pathname: string): string {
  if (PAGE_COLORS[pathname]) return PAGE_COLORS[pathname];
  for (const [key, color] of Object.entries(PAGE_COLORS)) {
    if (key !== '/' && pathname.startsWith(key)) return color;
  }
  return '#F7F5F2';
}

export default function PageBackground() {
  const pathname = usePathname();

  useEffect(() => {
    const color = getPageColor(pathname);
    document.documentElement.style.setProperty('--page-bg', color);
  }, [pathname]);

  return null;
}
