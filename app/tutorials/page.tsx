import SectionCard, { SectionItem } from '@/components/SectionCard';
import tutorialsData from '@/data/tutorials.json';

export default function TutorialsPage() {
  const items: SectionItem[] = tutorialsData.items;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-3xl text-gray-900 mb-8">Tutorials</h1>
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <SectionCard key={item.id} item={item} basePath="/tutorials" />
            ))
          ) : (
            <p className="text-gray-600">No tutorials yet. Check back soon!</p>
          )}
        </div>
      </div>
    </div>
  );
}
