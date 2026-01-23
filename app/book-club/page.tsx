import bookClubData from '@/data/book-club.json';
import FeaturedBook from '@/components/FeaturedBook';
import BookCard, { Book } from '@/components/BookCard';

export default function BookClubPage() {
  const books: Book[] = bookClubData.items;
  const featuredBook = books.find((book) => book.featured && book.status === 'reading now');
  const previousBooks = books.filter((book) => !book.featured || book.status !== 'reading now');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Book Club</h1>
        
        {featuredBook && (
          <FeaturedBook book={featuredBook} />
        )}

        {previousBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {featuredBook ? 'Previous Reads' : 'Books'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {previousBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

        {books.length === 0 && (
          <p className="text-gray-600">No books yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
