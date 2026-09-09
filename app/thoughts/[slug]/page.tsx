import type { Metadata } from 'next';
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

const items: SectionItem[] = thoughtsData.items;

/** Show a section index for pieces at or above this reading time. */
const INDEX_THRESHOLD_MIN = 8;

function formatDate(iso: string) {
  // Parse the date parts directly so "2026-02-20" is not shifted by timezone.
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function textOf(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(textOf).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return textOf((children as any).props?.children);
  }
  return '';
}

function loadArticle(slug: string) {
  const markdownPath = join(process.cwd(), 'content', 'thoughts', `${slug}.md`);
  const raw = readFileSync(markdownPath, 'utf-8');
  // Strip YAML frontmatter and the leading h1 (rendered from metadata instead)
  const content = raw.replace(/^---[\s\S]*?---\n*/, '').replace(/^# .+\n+/, '');
  const headings = Array.from(content.matchAll(/^## (.+)$/gm)).map((m) => m[1].trim());
  return { content, headings };
}

export async function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = items.find((item) => item.slug === slug);
  if (!post) return {};
  const ogImage = `/images/thoughts/${post.slug}-og.png`;
  return {
    title: `${post.title} | Marshall Weiss`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function ThoughtPost({ params }: PageProps) {
  const { slug } = await params;

  const currentIndex = items.findIndex((item) => item.slug === slug);
  const post = currentIndex >= 0 ? items[currentIndex] : undefined;
  if (!post) notFound();

  // Previous/next with wraparound
  const prevPost = currentIndex > 0 ? items[currentIndex - 1] : items[items.length - 1];
  const nextPost = currentIndex < items.length - 1 ? items[currentIndex + 1] : items[0];

  let content = '';
  let headings: string[] = [];
  try {
    ({ content, headings } = loadArticle(slug));
  } catch (error) {
    console.error(`Error reading article: ${slug}`, error);
    notFound();
  }

  const showIndex = (post.readingTime ?? 0) >= INDEX_THRESHOLD_MIN && headings.length >= 4;

  return (
    <div className="min-h-screen py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/thoughts"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 mb-10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Thoughts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
            {post.category && <span>{post.category}</span>}
            {post.category && post.readingTime && <span className="mx-2">·</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 leading-[1.1] mb-5">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-5">
              {post.description}
            </p>
          )}
          <time dateTime={post.date} className="text-sm text-stone-500">
            {formatDate(post.date)}
          </time>
        </header>

        {/* Illustration */}
        <div className="mb-12 rounded-lg overflow-hidden ring-1 ring-stone-900/10">
          <img
            src={`/images/thoughts/${post.slug}-og.png`}
            alt=""
            width={1200}
            height={630}
            className="w-full h-auto block"
          />
        </div>

        {/* Section index for long reads */}
        {showIndex && (
          <nav aria-label="In this piece" className="mb-12 border-l-2 border-stone-900/10 pl-5">
            <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3">
              In this piece
            </p>
            <ol className="space-y-1.5">
              {headings.map((h) => (
                <li key={h}>
                  <a
                    href={`#${slugify(h)}`}
                    className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    {h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Body */}
        <article className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="font-display text-3xl mt-12 mb-4 text-stone-800" {...props} />
              ),
              h2: ({ node, children, ...props }) => (
                <h2
                  id={slugify(textOf(children))}
                  className="font-display text-2xl md:text-3xl mt-14 mb-4 text-stone-800 scroll-mt-24"
                  {...props}
                >
                  {children}
                </h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 className="font-display text-xl mt-8 mb-3 text-stone-800" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-5 text-[17px] text-stone-700 leading-[1.75]" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 mb-5 space-y-2 text-[17px] text-stone-700" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 mb-5 space-y-2 text-[17px] text-stone-700" {...props} />
              ),
              li: ({ node, ...props }) => <li className="leading-[1.7]" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-stone-900" {...props} />
              ),
              em: ({ node, ...props }) => <em className="italic" {...props} />,
              code: ({ node, inline, className, ...props }: any) =>
                inline ? (
                  <code
                    className="bg-stone-900/[0.06] text-stone-800 px-1.5 py-0.5 rounded text-[0.9em] font-mono"
                    {...props}
                  />
                ) : (
                  <code
                    className="block bg-stone-900/[0.05] text-stone-800 p-5 rounded-lg text-sm leading-relaxed font-mono overflow-x-auto mb-6 whitespace-pre"
                    {...props}
                  />
                ),
              pre: ({ node, ...props }) => <pre className="mb-0" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="my-10 border-l-2 border-stone-800 pl-6 font-display text-2xl leading-snug text-stone-700 [&>p]:text-2xl [&>p]:leading-snug [&>p]:text-stone-700 [&>p]:mb-0"
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-12 border-stone-900/10" {...props} />
              ),
              a: ({ node, href, ...props }) => {
                const internal = typeof href === 'string' && href.startsWith('/');
                return (
                  <a
                    href={href}
                    className="text-stone-900 underline decoration-stone-400 underline-offset-2 hover:decoration-stone-800 transition-colors"
                    {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    {...props}
                  />
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>

      {/* Post navigation */}
      {items.length > 1 && (
        <nav className="border-t border-stone-900/10 py-12 max-w-3xl mx-auto mt-20">
          <div className="flex justify-between items-start gap-8">
            <Link
              href={`/thoughts/${prevPost.slug}`}
              className="group flex items-start gap-3 text-stone-800 hover:text-stone-500 transition-colors max-w-[45%]"
            >
              <ChevronLeft className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
              <span className="font-display text-base md:text-lg leading-snug">{prevPost.title}</span>
            </Link>

            <Link
              href={`/thoughts/${nextPost.slug}`}
              className="group flex items-start gap-3 text-stone-800 hover:text-stone-500 transition-colors ml-auto text-right max-w-[45%]"
            >
              <span className="font-display text-base md:text-lg leading-snug">{nextPost.title}</span>
              <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
