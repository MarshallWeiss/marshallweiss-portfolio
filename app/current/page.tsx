import { getCurrentlyReading, getPastBooks, getWorkProjects, getFunProjects, getDoingItems } from '@/lib/sanity-these-days';
import ConfidentialCard from '@/components/ConfidentialCard';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Current',
  description: 'What I’m working on, reading, making, and doing.',
};

export const revalidate = 60;

export default async function TheseDaysPage() {
  const [currentlyReading, pastBooks, workProjects, funProjects, doingItems] = await Promise.all([
    getCurrentlyReading(),
    getPastBooks(6),
    getWorkProjects(5),
    getFunProjects(3),
    getDoingItems(6),
  ]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-3xl text-gray-900 mb-2">Current</h1>
        <p className="text-gray-600 mb-12">
          What I'm working on, reading, and doing right now.
        </p>

        {/* 2x2 grid; every row takes the tallest card's height so all four cards match */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-6">
          {/* Working - client component with cursor tooltip */}
          <ConfidentialCard projects={workProjects} />

          {/* Playing */}
          <div className="border border-gray-200/60 rounded-xl p-5 sm:p-8 bg-white/50 h-full">
            <h2 className="font-display text-xl text-gray-900 mb-1">Playing</h2>
            <p className="text-sm text-gray-500 mb-6">Side projects and experiments</p>
            <div className="space-y-4">
              {funProjects.length > 0 ? (
                funProjects.map((project: any) => {
                  // Same thumbnails as the homepage side projects.
                  const thumb = /ai atlas/i.test(project.title)
                    ? '/experiments/ai-atlas-thumb.jpg'
                    : /lapidarium/i.test(project.title)
                      ? '/experiments/lapidarium/malachite.webp'
                      : project.image;
                  const isLapidarium = /lapidarium/i.test(project.title);
                  return (
                    <div key={project.id} className="flex gap-4">
                      {thumb && (
                        <span className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg ${isLapidarium ? 'bg-white' : 'bg-[#efe9df]'}`}>
                          <img
                            src={thumb}
                            alt=""
                            width={48}
                            height={48}
                            loading="lazy"
                            className={`h-full w-full ${isLapidarium ? 'object-contain scale-[1.4]' : 'object-cover'}`}
                          />
                        </span>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-base font-medium text-gray-900">
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[var(--portfolio-blue)] transition-colors"
                            >
                              {project.title}
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          ) : (
                            project.title
                          )}
                        </h3>
                        {project.description && (
                          <p className="text-sm text-gray-600 leading-snug mt-1 line-clamp-2">{project.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No fun projects right now.</p>
              )}
            </div>
          </div>

          {/* Reading */}
          <div className="border border-gray-200/60 rounded-xl p-5 sm:p-8 bg-white/50 h-full">
            <h2 className="font-display text-xl text-gray-900 mb-1">Reading</h2>
            <p className="text-sm text-gray-500 mb-6">What's on the nightstand</p>
            {currentlyReading ? (
              <div className="flex gap-4">
                {currentlyReading.cover && (
                  <img
                    src={currentlyReading.cover}
                    alt={currentlyReading.title}
                    className="w-24 aspect-[2/3] object-cover rounded shadow-sm shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">{currentlyReading.title}</h3>
                  {currentlyReading.author && (
                    <p className="text-xs text-gray-500 mb-2">by {currentlyReading.author}</p>
                  )}
                  {currentlyReading.description && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">{currentlyReading.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Not reading anything right now.</p>
            )}

            {pastBooks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Previously</h3>
                <div className="space-y-3">
                  {pastBooks.map((book: any) => (
                    <div key={book.id}>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Doing */}
          <div className="border border-gray-200/60 rounded-xl p-5 sm:p-8 bg-white/50 h-full">
            <h2 className="font-display text-xl text-gray-900 mb-1">Doing</h2>
            <p className="text-sm text-gray-500 mb-6">Hobbies and habits</p>
            <div className="space-y-5">
              {doingItems.length > 0 ? (
                doingItems.map((item: any) => {
                  // Titles start with an emoji in Sanity; give it a little room from the words.
                  const match = String(item.title).match(new RegExp('^((?:\\p{Extended_Pictographic}|\\p{Emoji_Modifier}|\\uFE0F|\\u200D)+)\\s*(.*)$', 'u'));
                  return (
                  <div key={item.id}>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      {match ? (
                        <>
                          <span className="mr-2.5" aria-hidden="true">{match[1]}</span>
                          {match[2]}
                        </>
                      ) : (
                        item.title
                      )}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">Nothing here yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
