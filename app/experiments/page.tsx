import SectionCard, { SectionItem } from '@/components/SectionCard';
import experimentsData from '@/data/experiments.json';

export default function ExperimentsPage() {
  const items: SectionItem[] = experimentsData.items;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Experiments</h1>
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <SectionCard key={item.id} item={item} basePath="/experiments" />
            ))
          ) : (
            <p className="text-gray-600">No experiments yet. Check back soon!</p>
          )}
        </div>
      </div>
    </div>
  );
}
