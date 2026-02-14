import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { readFileSync } from 'fs';
import { join } from 'path';
import thoughtsData from '@/data/thoughts.json';
import { SectionItem } from '@/components/SectionCard';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const items: SectionItem[] = thoughtsData.items;
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ThoughtPost({ params }: PageProps) {
  const { slug } = await params;

  const items: SectionItem[] = thoughtsData.items;
  const currentIndex = items.findIndex((item) => item.slug === slug);
  const post = currentIndex >= 0 ? items[currentIndex] : undefined;

  if (!post) {
    notFound();
  }

  // Previous/next with infinite loop
  const prevPost = currentIndex > 0
    ? items[currentIndex - 1]
    : items[items.length - 1];
  const nextPost = currentIndex < items.length - 1
    ? items[currentIndex + 1]
    : items[0];

  // Read the markdown file
  const markdownPath = join(process.cwd(), 'content', 'thoughts', `${slug}.md`);

  let content = '';

  try {
    const rawContent = readFileSync(markdownPath, 'utf-8');
    // Strip YAML frontmatter and leading h1 (already shown in page header)
    content = rawContent.replace(/^---[\s\S]*?---\n*/, '').replace(/^# .+\n+/, '');
  } catch (error: any) {
    console.error(`Error reading markdown file: ${markdownPath}`, error);
    notFound();
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/thoughts"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Thoughts
        </Link>

        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <time className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>

        {/* Post content */}
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-900" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 text-gray-700 leading-7" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="leading-7" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-gray-900" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic" {...props} />
              ),
              code: ({ node, inline, ...props }: any) =>
                inline ? (
                  <code
                    className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  />
                ) : (
                  <code
                    className="block bg-gray-100 text-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4"
                    {...props}
                  />
                ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>

      {/* Post Navigation */}
      {items.length > 1 && (
        <nav className="border-t border-gray-200 py-12 max-w-3xl mx-auto mt-16">
          <div className="flex justify-between items-center gap-8">
            <Link
              href={`/thoughts/${prevPost.slug}`}
              className="group flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
              <span className="text-base md:text-lg font-normal">{prevPost.title}</span>
            </Link>

            <Link
              href={`/thoughts/${nextPost.slug}`}
              className="group flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors ml-auto"
            >
              <span className="text-base md:text-lg font-normal text-right">{nextPost.title}</span>
              <ChevronRight className="w-6 h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
