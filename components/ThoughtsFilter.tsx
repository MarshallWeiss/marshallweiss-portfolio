'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionItem } from '@/components/SectionCard';

interface CuratedArticle {
  id: string;
  title: string;
  url: string;
  source?: string;
  description?: string;
  ogImage?: string;
  category?: string;
  addedAt?: string;
}

interface ThoughtsFilterProps {
  items: SectionItem[];
  curatedArticles?: CuratedArticle[];
}

export default function ThoughtsFilter({ items, curatedArticles = [] }: ThoughtsFilterProps) {
  const [activeTab, setActiveTab] = useState<'mine' | 'others'>('mine');

  return (
    <div>
      <div className="flex gap-6 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('mine')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'mine'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Mine
        </button>
        <button
          onClick={() => setActiveTab('others')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'others'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Others
        </button>
      </div>

      {activeTab === 'mine' ? (
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
      ) : (
        <div className="space-y-4">
          {curatedArticles.length > 0 ? (
            curatedArticles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-32 border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
              >
                <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-base text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {article.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 truncate">
                    <span className="truncate">{new URL(article.url).hostname.replace('www.', '')}</span>
                    {article.addedAt && (
                      <>
                        <span>·</span>
                        <span className="flex-shrink-0">{new Date(article.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </>
                    )}
                    {article.category && (
                      <>
                        <span>·</span>
                        <span className="flex-shrink-0">{article.category}</span>
                      </>
                    )}
                  </div>
                </div>
                {article.ogImage && (
                  <div className="flex-shrink-0 w-36 sm:w-44 bg-gray-100">
                    <img
                      src={article.ogImage}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </a>
            ))
          ) : (
            <p className="text-gray-600">No curated articles yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
