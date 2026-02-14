'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

interface LazyBlockProps {
  children: ReactNode;
  /** Vertical margin around the root for triggering early (e.g. "200px") */
  rootMargin?: string;
  /** Minimum height placeholder before the block loads */
  minHeight?: string;
}

export default function LazyBlock({
  children,
  rootMargin = '200px',
  minHeight = '200px',
}: LazyBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (isVisible) {
    return <>{children}</>;
  }

  return <div ref={ref} style={{ minHeight }} />;
}
