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
              : 'text-gray-600 hover:text-gray-600'
          }`}
        >
          Mine
        </button>
        <button
          onClick={() => setActiveTab('others')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'others'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-600'
          }`}
        >
          Others
        </button>
      </div>

      {activeTab === 'mine' ? (
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <Link
                key={item.id}
                href={`/thoughts/${item.slug}`}
                className="group flex h-32 border border-gray-200/60 rounded-lg overflow-hidden hover:border-gray-300 transition-colors bg-white/50"
              >
                <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {item.category && (
                      <>
                        <span className="truncate">{item.category}</span>
                        {item.readingTime && <span>·</span>}
                      </>
                    )}
                    {item.readingTime && (
                      <span className="flex-shrink-0">{item.readingTime} min read</span>
                    )}
                  </div>
                </div>
                {item.image && (
                  <div className="flex-shrink-0 w-28 sm:w-32 p-2">
                    <div className="w-full h-full bg-gray-100 rounded overflow-hidden">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).parentElement!.parentElement!.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
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
                className="group flex h-32 border border-gray-200/60 rounded-lg overflow-hidden hover:border-gray-300 transition-colors bg-white/50"
              >
                <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {article.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
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
                  <div className="flex-shrink-0 w-28 sm:w-32 p-2">
                    <div className="w-full h-full bg-gray-100 rounded overflow-hidden">
                      <img
                        src={article.ogImage}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).parentElement!.parentElement!.style.display = 'none';
                        }}
                      />
                    </div>
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
