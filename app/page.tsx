import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const sections = [
  { name: 'Case Studies', path: '/case-studies', description: 'Product design work' },
  { name: 'Thoughts', path: '/thoughts', description: 'Writing on design and AI' },
  { name: 'Current', path: '/current', description: 'What I\'m up to now' },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.1] mb-16">
          Marshall Weiss<br />
          is a senior product designer<br />
          at{' '}
          <a href="https://www.elconfidencial.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 hover:decoration-gray-900 transition-colors">
            El Confidencial
          </a>
        </h1>

        <nav className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.path}
              href={section.path}
              className="group flex items-center justify-between py-4 border-t border-gray-200 hover:border-gray-900 transition-colors"
            >
              <div>
                <span className="font-display text-lg text-gray-900">{section.name}</span>
                <p className="text-sm text-gray-500 mt-0.5">{section.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
