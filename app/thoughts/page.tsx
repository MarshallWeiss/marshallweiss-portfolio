import ThoughtsFilter from '@/components/ThoughtsFilter';
import thoughtsData from '@/data/thoughts.json';
import { getCuratedArticles } from '@/lib/sanity-these-days';

export default async function ThoughtsPage() {
  const items = thoughtsData.items;
  let curatedArticles: any[] = [];
  try {
    curatedArticles = await getCuratedArticles();
  } catch (e) {
    console.error('Failed to fetch curated articles:', e);
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ThoughtsFilter items={items} curatedArticles={curatedArticles} />
      </div>
    </div>
  );
}
