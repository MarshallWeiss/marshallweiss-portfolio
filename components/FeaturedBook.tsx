import Image from 'next/image';
import { Book } from './BookCard';

interface FeaturedBookProps {
  book: Book;
}

export default function FeaturedBook({ book }: FeaturedBookProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl overflow-hidden mb-12">
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-48 md:w-64 aspect-[2/3] relative bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={book.cover}
                alt={`${book.title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-4">
                Currently Reading
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {book.title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {book.synopsis}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-white text-gray-700 rounded-full border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <time className="text-sm text-gray-500">
              Started {new Date(book.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}
