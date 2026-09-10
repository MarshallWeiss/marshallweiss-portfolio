'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const navItems = [
  { name: 'Work', path: '/case-studies' },
  { name: 'Writing', path: '/thoughts' },
  { name: 'Current', path: '/current' },
  { name: 'About', path: '/about' },
];
export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open]);
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className="portfolio-container header-inner"
      >
        <Link href="/" className="wordmark" aria-label="Marshall Weiss home">
          Marshall Weiss
          <span className="wordmark-dot" aria-hidden="true" />
        </Link>
        <button
          ref={button}
          className="mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`header-links ${open ? 'is-open' : ''}`} id="main-menu">
          {navItems.map((item) => {
            const active =
              pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          <a href="mailto:marshallweiss94@gmail.com" className="header-contact">
            Say hello <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
