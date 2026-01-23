import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { readFileSync } from 'fs';
import { join } from 'path';
import thoughtsData from '@/data/thoughts.json';
import { SectionItem } from '@/components/SectionCard';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:generateStaticParams',message:'generateStaticParams entry',data:{itemsCount:thoughtsData.items.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const items: SectionItem[] = thoughtsData.items;
  const result = items.map((item) => ({
    slug: item.slug,
  }));
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:generateStaticParams',message:'generateStaticParams exit',data:{paramsGenerated:result.length,slugs:result.map(r=>r.slug)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  return result;
}

export default async function ThoughtPost({ params }: PageProps) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'ThoughtPost entry',data:{paramsType:typeof params,slug:params.slug},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  const items: SectionItem[] = thoughtsData.items;
  const post = items.find((item) => item.slug === params.slug);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'post lookup',data:{slug:params.slug,postFound:!!post,postTitle:post?.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  if (!post) {
    notFound();
  }

  // Read the markdown file
  const cwd = process.cwd();
  const markdownPath = join(cwd, 'content', 'thoughts', `${params.slug}.md`);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'before file read',data:{cwd,markdownPath,slug:params.slug},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  let content = '';

  try {
    content = readFileSync(markdownPath, 'utf-8');
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'file read success',data:{contentLength:content.length,firstChars:content.substring(0,50)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  } catch (error: any) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'file read error',data:{error:error?.message,code:error?.code,markdownPath},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    console.error(`Error reading markdown file: ${markdownPath}`, error);
    notFound();
  }
  
  // #region agent log
  let reactMarkdownAvailable = false;
  try {
    reactMarkdownAvailable = !!ReactMarkdown;
    fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'ReactMarkdown check',data:{available:reactMarkdownAvailable,type:typeof ReactMarkdown},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  } catch (error: any) {
    fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'ReactMarkdown import error',data:{error:error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion

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
          {/* #region agent log */}
          {(() => {
            try {
              fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/thoughts/[slug]/page.tsx:ThoughtPost',message:'before ReactMarkdown render',data:{contentLength:content.length,remarkGfmType:typeof remarkGfm},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
            } catch (e) {}
            return null;
          })()}
          {/* #endregion */}
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
    </div>
  );
}
