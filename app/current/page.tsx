import { getCurrentlyReading, getPastBooks, getWorkProjects, getFunProjects, getDoingItems } from '@/lib/sanity-these-days';
import ConfidentialCard from '@/components/ConfidentialCard';
import LapidariumArtwork from '@/components/LapidariumArtwork';

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
    getDoingItems(),
  ]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-3xl text-gray-900 mb-2">Current</h1>
        <p className="text-gray-600 mb-12">
          What I'm working on, reading, and doing right now.
        </p>

        {/* 2x2 card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Working - client component with cursor tooltip */}
          <ConfidentialCard projects={workProjects} />

          {/* Playing */}
          <div className="border border-gray-200/60 rounded-xl p-5 sm:p-8 bg-white/50">
            <h2 className="font-display text-xl text-gray-900 mb-1">Playing</h2>
            <p className="text-sm text-gray-500 mb-6">Side projects and experiments</p>
            <div className="space-y-5">
              {funProjects.length > 0 ? (
                funProjects.map((project: any) => {
                  const isLapidarium = project.title === 'Lapidarium';
                  const hasArtwork = isLapidarium || project.image;
                  return (
                    <div key={project.id} className={`grid gap-x-4 gap-y-2 ${hasArtwork ? 'grid-cols-[64px_minmax(0,1fr)] sm:grid-cols-[80px_minmax(0,1fr)]' : 'grid-cols-1'}`}>
                      {hasArtwork && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 sm:row-span-4">
                          {isLapidarium ? (
                            <LapidariumArtwork compact imageSrc={project.image} />
                          ) : (
                            <img
                              src={project.image}
                              alt=""
                              width={80}
                              height={80}
                              loading="lazy"
                              className="w-full h-full object-cover rounded-2xl shadow-sm"
                            />
                          )}
                        </div>
                      )}
                      <h3 className="text-base font-medium text-gray-900 self-center sm:self-start">{project.title}</h3>
                      {project.description && (
                        <p className={`text-sm text-gray-600 leading-relaxed ${hasArtwork ? 'col-span-2 sm:col-span-1 sm:col-start-2' : ''}`}>{project.description}</p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 ${hasArtwork ? 'col-span-2 sm:col-span-1 sm:col-start-2' : ''}`}>
                          {project.tags.map((tag: string) => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title}`}
                          className={`text-xs font-medium text-gray-900 px-3 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors justify-self-start mt-1 ${hasArtwork ? 'col-span-2 sm:col-span-1 sm:col-start-2' : ''}`}
                        >
                          View live experiment ↗
                        </a>
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
          <div className="border border-gray-200/60 rounded-xl p-5 sm:p-8 bg-white/50">
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
          <div className="border border-gray-200/60 rounded-xl p-5 sm:p-8 bg-white/50">
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
