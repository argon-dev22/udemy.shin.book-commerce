import { fetchAllBooks } from "@/lib/microcms/read";
import { BookType } from "@/types/book";
import Book from "./_components/Book";

export default async function Home() {
  const books = await fetchAllBooks();

  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Book Commerce
      </h2>
      {books.contents.map((book: BookType) => (
        <Book key={book.id} book={book} />
      ))}
    </main>
  );
}
