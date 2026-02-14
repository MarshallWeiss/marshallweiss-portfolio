import { getCurrentlyReading, getWorkProjects, getFunProjects } from '@/lib/notion';

export const revalidate = 3600; // Revalidate every hour

export default async function TheseDaysPage() {
  const [currentlyReading, workProjects, funProjects] = await Promise.all([
    getCurrentlyReading(),
    getWorkProjects(3),
    getFunProjects(3),
  ]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">These days</h1>
        <p className="text-gray-600 mb-12">
          What I'm working on, reading, and thinking about right now.
        </p>

        {/* Working on at Work */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Working on at Work</h2>
          <div className="space-y-4">
            {workProjects.length > 0 ? (
              workProjects.map((project) => (
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Working on for Fun</h2>
          <div className="space-y-4">
            {funProjects.length > 0 ? (
              funProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-700 mb-2">{project.description}</p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Currently Reading</h2>
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
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">AI-Curated Technology Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Get weekly insights on AI, design, and technology—curated and summarized by AI, written by me.
            </p>
            <form className="flex gap-3 max-w-md">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-3">
              Coming soon. No spam, unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
