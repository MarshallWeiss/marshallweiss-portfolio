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
            className="group block py-3 border-b border-gray-200 hover:border-gray-400 transition-colors"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-600">No thoughts yet.</p>
      )}
    </div>
  );
}
