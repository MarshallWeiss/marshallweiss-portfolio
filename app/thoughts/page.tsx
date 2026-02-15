import ThoughtsFilter from '@/components/ThoughtsFilter';
import thoughtsData from '@/data/thoughts.json';

export default function ThoughtsPage() {
  const items = thoughtsData.items;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ThoughtsFilter items={items} />
      </div>
    </div>
  );
}
