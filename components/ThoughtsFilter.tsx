'use client';

import Link from 'next/link';
import { SectionItem } from '@/components/SectionCard';

interface ThoughtsFilterProps {
  items: SectionItem[];
}

export default function ThoughtsFilter({ items }: ThoughtsFilterProps) {
  return (
    <div className="space-y-3">
      {items.length > 0 ? (
        items.map((item) => (
          <Link
            key={item.id}
            href={`/thoughts/${item.slug}`}
            className="group block py-5 border-b border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              {item.category && (
                <span className="text-xs font-medium text-gray-500 px-2.5 py-0.5 bg-gray-100 rounded-full">
                  {item.category}
                </span>
              )}
              {item.readingTime && (
                <span className="text-xs text-gray-400">
                  {item.readingTime} min read
                </span>
              )}
            </div>
            <h3 className="font-display text-3xl text-gray-900 group-hover:text-gray-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {item.description}
            </p>
          </Link>
        ))
      ) : (
        <p className="text-gray-600">No thoughts yet.</p>
      )}
    </div>
  );
}
