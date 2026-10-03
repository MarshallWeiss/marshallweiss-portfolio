import { getCurrentlyReading, getPastBooks, getWorkProjects, getFunProjects, getDoingItems } from '@/lib/sanity-these-days';
import ConfidentialCard from '@/components/ConfidentialCard';
import LapidariumArtwork from '@/components/LapidariumArtwork';
import AtlasArtwork from '@/components/AtlasArtwork';

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
            <div className="space-y-5">
              {funProjects.length > 0 ? (
                funProjects.map((project: any) => {
                  const isLapidarium = project.title === 'Lapidarium';
                  const isAtlas = /ai atlas/i.test(project.title);
                  const hasArtwork = isLapidarium || isAtlas || project.image;
                  const title = project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-1.5 text-base font-medium text-gray-900 hover:text-[var(--portfolio-blue)] transition-colors"
                    >
                      {project.title}
                      <span aria-hidden="true" className="text-xs text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    </a>
                  ) : (
                    <h3 className="text-base font-medium text-gray-900">{project.title}</h3>
                  );
                  return (
                    <div key={project.id} className={`grid gap-x-4 gap-y-1.5 ${hasArtwork ? 'grid-cols-[56px_minmax(0,1fr)]' : 'grid-cols-1'}`}>
                      {hasArtwork && (
                        <div className="w-14 h-14 sm:row-span-3">
                          {isLapidarium ? (
                            <LapidariumArtwork compact imageSrc={project.image} />
                          ) : isAtlas ? (
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm ring-1 ring-black/5">
                              {/* Zoom into one corner of the map so the thumbnail reads as a map fragment, not a shrunken poster. */}
                              <div className="absolute inset-0" style={{ transform: 'scale(2.7)', transformOrigin: '34% 22%' }}>
                                <AtlasArtwork />
                              </div>
                            </div>
                          ) : (
                            <img
                              src={project.image}
                              alt=""
                              width={56}
                              height={56}
                              loading="lazy"
                              className="w-full h-full object-cover rounded-xl shadow-sm"
                            />
                          )}
                        </div>
                      )}
                      <div className="self-center sm:self-start">{title}</div>
                      {project.description && (
                        <p className={`text-sm text-gray-600 leading-snug line-clamp-2 ${hasArtwork ? 'col-span-2 sm:col-span-1 sm:col-start-2' : ''}`}>{project.description}</p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 ${hasArtwork ? 'col-span-2 sm:col-span-1 sm:col-start-2' : ''}`}>
                          {project.tags.map((tag: string) => (
                            <span key={tag} className="text-[11px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
                doingItems.map((item: any) => (
                  <div key={item.id}>
                    <h3 className="text-base font-medium text-gray-900 mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))
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
