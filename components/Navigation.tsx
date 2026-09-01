'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { name: 'Work', path: '/case-studies' },
  { name: 'Thoughts', path: '/thoughts' },
  { name: 'Current', path: '/current' },
  { name: 'About', path: '/about' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
      className="sticky top-0 z-50 backdrop-blur-sm border-b border-stone-900/10 transition-[background-color] duration-500 ease-in-out"
      style={{ backgroundColor: 'color-mix(in srgb, var(--page-bg) 80%, transparent)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-display text-xl text-stone-600 hover:text-stone-800 transition-colors">
            Marshall Weiss
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-stone-700 border-b-2 border-stone-500 pb-1'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-stone-500 hover:text-stone-700 hover:bg-stone-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed top-16 left-0 right-0 z-40 px-4 sm:px-6 py-4 space-y-2 border-b border-stone-900/10 backdrop-blur-md shadow-lg shadow-stone-900/10"
          style={{ backgroundColor: 'color-mix(in srgb, var(--page-bg) 60%, transparent)' }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-stone-700 bg-stone-100'
                    : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
