import { getCurrentlyReading, getPastBooks, getWorkProjects, getFunProjects } from '@/lib/sanity-these-days';

export const revalidate = 3600; // Revalidate every hour

const doingItems = [
  {
    title: 'Singing lessons',
    description: 'Taking voice lessons weekly, working on breath control and expanding range.',
  },
  {
    title: 'Cycling around Madrid',
    description: 'Exploring new routes through Casa de Campo and along the Manzanares river.',
  },
  {
    title: 'Learning fingerpicking guitar',
    description: 'Working through folk and classical fingerstyle patterns in the evenings.',
  },
];

export default async function TheseDaysPage() {
  const [currentlyReading, pastBooks, workProjects, funProjects] = await Promise.all([
    getCurrentlyReading(),
    getPastBooks(6),
    getWorkProjects(3),
    getFunProjects(3),
  ]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-3xl text-gray-900 mb-2">Current</h1>
        <p className="text-gray-600 mb-12">
          What I'm working on, reading, and doing right now.
        </p>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {/* Working */}
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-6">Working</h2>
            <div className="space-y-6">
              {workProjects.length > 0 ? (
                workProjects.map((project: any) => (
                  <div key={project.id} className="border-t border-gray-200 pt-5 relative">
                    <div className="select-none">
                      <h3 className="text-base font-medium text-gray-900 mb-1 blur-[6px]">{project.title}</h3>
                      {project.company && (
                        <p className="text-xs text-gray-500 mb-2 blur-[6px]">{project.company}</p>
                      )}
                      {project.description && (
                        <p className="text-sm text-gray-600 leading-relaxed blur-[6px]">{project.description}</p>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-medium text-gray-400 bg-white/80 px-3 py-1 rounded-full border border-gray-200">
                        Confidential
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-t border-gray-200 pt-5 relative">
                  <div className="select-none">
                    <h3 className="text-base font-medium text-gray-900 mb-1 blur-[6px]">Subscription growth initiative</h3>
                    <p className="text-xs text-gray-500 mb-2 blur-[6px]">El Confidencial</p>
                    <p className="text-sm text-gray-600 leading-relaxed blur-[6px]">Leading product discovery and design for a new subscriber conversion flow targeting engaged readers.</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs font-medium text-gray-400 bg-white/80 px-3 py-1 rounded-full border border-gray-200">
                      Confidential
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Playing */}
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-6">Playing</h2>
            <div className="space-y-6">
              {funProjects.length > 0 ? (
                funProjects.map((project: any) => (
                  <div key={project.id} className="border-t border-gray-200 pt-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-medium text-gray-900 mb-1">{project.title}</h3>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-gray-900 shrink-0 ml-2"
                        >
                          View →
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{project.description}</p>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No fun projects right now.</p>
              )}
            </div>
          </section>

          {/* Reading */}
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-6">Reading</h2>
            {currentlyReading ? (
              <div className="border-t border-gray-200 pt-5 flex gap-4">
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

            {/* Past Books */}
            {pastBooks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Previously</h3>
                <div className="space-y-3">
                  {pastBooks.map((book: any) => (
                    <div key={book.id} className="border-t border-gray-100 pt-3">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Doing */}
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-6">Doing</h2>
            <div className="space-y-6">
              {doingItems.map((item, i) => (
                <div key={i} className="border-t border-gray-200 pt-5">
                  <h3 className="text-base font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
