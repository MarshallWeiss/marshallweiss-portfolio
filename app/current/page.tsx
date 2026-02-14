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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Current</h1>
        <p className="text-gray-600 mb-12">
          What I'm working on, reading, and thinking about right now.
        </p>

        {/* Working on at Work */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Work</h2>
          <div className="space-y-4">
            {workProjects.length > 0 ? (
              workProjects.map((project: any) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{project.title}</h3>
                  {project.company && (
                    <p className="text-sm text-gray-600 mb-2">{project.company}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700">{project.description}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="border border-gray-200 rounded-lg p-6">
                <p className="text-gray-600">No work projects right now.</p>
              </div>
            )}
          </div>
        </section>

        {/* Working on for Fun */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Play</h2>
          <div className="space-y-4">
            {funProjects.length > 0 ? (
              funProjects.map((project: any) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-700 mb-2">{project.description}</p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-sm text-gray-600 hover:text-gray-900"
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="border border-gray-200 rounded-lg p-6">
                <p className="text-gray-600">No fun projects right now.</p>
              </div>
            )}
          </div>
        </section>

        {/* Currently Reading */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reading</h2>
          <div className="space-y-4">
            {currentlyReading ? (
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex gap-6">
                  {currentlyReading.cover && (
                    <img
                      src={currentlyReading.cover}
                      alt={currentlyReading.title}
                      className="w-24 h-auto object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{currentlyReading.title}</h3>
                    {currentlyReading.author && (
                      <p className="text-sm text-gray-600 mb-2">by {currentlyReading.author}</p>
                    )}
                    {currentlyReading.description && (
                      <p className="text-gray-700">{currentlyReading.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-6">
                <p className="text-gray-600">Not reading anything right now.</p>
              </div>
            )}
          </div>

          {/* Past Books */}
          {pastBooks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Past Reads</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {pastBooks.map((book: any) => (
                  <div key={book.id} className="flex flex-col">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full aspect-[2/3] object-cover rounded shadow-sm mb-2"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-gray-200 rounded shadow-sm mb-2 flex items-center justify-center">
                        <span className="text-gray-400 text-xs text-center px-2">{book.title}</span>
                      </div>
                    )}
                    <p className="text-xs font-medium text-gray-900 line-clamp-2">{book.title}</p>
                    <p className="text-xs text-gray-600">{book.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
