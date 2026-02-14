'use client';

import Link from 'next/link';
import { SectionItem } from '@/components/SectionCard';

interface ThoughtsFilterProps {
  items: (SectionItem & { stage?: string })[];
}

const stageConfig = {
  planting: { label: '🌱 Planting', color: 'bg-green-100 text-green-700' },
  growing: { label: '🌿 Growing', color: 'bg-blue-100 text-blue-700' },
  harvesting: { label: '🌾 Harvesting', color: 'bg-amber-100 text-amber-700' },
};

export default function ThoughtsFilter({ items }: ThoughtsFilterProps) {
  return (
    <div className="space-y-3">
      {items.length > 0 ? (
        items.map((item) => {
          const stage = item.stage as keyof typeof stageConfig || 'planting';
          const stageInfo = stageConfig[stage];

          return (
            <Link
              key={item.id}
              href={`/thoughts/${item.slug}`}
              className="group block py-3 border-b border-gray-200 hover:border-gray-400 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${stageInfo.color}`}>
                  {stageInfo.label}
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="text-gray-600">No thoughts yet.</p>
      )}
    </div>
  );
}
