import { getCurrentlyReading, getPastBooks, getWorkProjects, getFunProjects } from '@/lib/sanity-these-days';

export const revalidate = 3600; // Revalidate every hour

export default async function TheseDaysPage() {
  const [currentlyReading, pastBooks, workProjects, funProjects] = await Promise.all([
    getCurrentlyReading(),
    getPastBooks(6),
    getWorkProjects(3),
    getFunProjects(3),
  ]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-3xl text-gray-900 mb-2">Current</h1>
        <p className="text-gray-600 mb-12">
          What I'm working on, reading, and thinking about right now.
        </p>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Work */}
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-4">Work</h2>
            <div className="space-y-4">
              {workProjects.length > 0 ? (
                workProjects.map((project: any) => (
                  <div key={project.id} className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{project.title}</h3>
                    {project.company && (
                      <p className="text-xs text-gray-500 mb-1">{project.company}</p>
                    )}
                    {project.description && (
                      <p className="text-sm text-gray-600">{project.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No work projects right now.</p>
              )}
            </div>
          </section>

          {/* Play */}
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-4">Play</h2>
            <div className="space-y-4">
              {funProjects.length > 0 ? (
                funProjects.map((project: any) => (
                  <div key={project.id} className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{project.title}</h3>
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
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
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
            <h2 className="font-display text-xl text-gray-900 mb-4">Reading</h2>
            {currentlyReading ? (
              <div className="border-t border-gray-200 pt-4 flex gap-4">
                {currentlyReading.cover && (
                  <img
                    src={currentlyReading.cover}
                    alt={currentlyReading.title}
                    className="w-20 aspect-[2/3] object-cover rounded shadow-sm shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{currentlyReading.title}</h3>
                  {currentlyReading.author && (
                    <p className="text-xs text-gray-500 mb-2">by {currentlyReading.author}</p>
                  )}
                  {currentlyReading.description && (
                    <p className="text-xs text-gray-600 line-clamp-4">{currentlyReading.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Not reading anything right now.</p>
            )}

            {/* Past Books */}
            {pastBooks.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Previously</h3>
                <div className="space-y-2">
                  {pastBooks.map((book: any) => (
                    <div key={book.id} className="border-t border-gray-100 pt-2">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
