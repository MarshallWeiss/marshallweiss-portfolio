import Link from 'next/link';
import Image from 'next/image';

export interface SectionItem {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
}

interface SectionCardProps {
  item: SectionItem;
  basePath: string;
}

export default function SectionCard({ item, basePath }: SectionCardProps) {
  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'SectionCard.tsx:18', message: 'SectionCard render - entry', data: { hasImage: !!item.image, imageUrl: item.image, itemId: item.id }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
  }
  // #endregion

  return (
    <Link
      href={`${basePath}/${item.slug}`}
      className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
    >
      <div className="flex gap-6">
        {item.image && (
          <div className="flex-shrink-0 w-32 h-32 relative rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          <time className="text-xs text-gray-500">
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
