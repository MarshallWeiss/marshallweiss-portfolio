import Image from 'next/image';

export interface Book {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  cover: string;
  tags: string[];
  date: string;
  slug: string;
  featured?: boolean;
  status?: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[2/3] relative bg-gray-100">
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
          {book.synopsis}
        </p>
        <div className="flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
