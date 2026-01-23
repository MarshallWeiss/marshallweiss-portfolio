import SectionCard, { SectionItem } from '@/components/SectionCard';
import thoughtsData from '@/data/thoughts.json';

export default function ThoughtsPage() {
  const items: SectionItem[] = thoughtsData.items;

  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7243/ingest/60ec796f-d4e3-4429-b157-49a2afc59d66',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:5',message:'ThoughtsPage render - entry',data:{itemCount:items.length,itemsWithImages:items.filter(i=>i.image).length,imageUrls:items.filter(i=>i.image).map(i=>i.image)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Thoughts</h1>
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <SectionCard key={item.id} item={item} basePath="/thoughts" />
            ))
          ) : (
            <p className="text-gray-600">No thoughts yet. Check back soon!</p>
          )}
        </div>
      </div>
    </div>
  );
}
