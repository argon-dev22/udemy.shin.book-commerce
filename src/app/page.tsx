import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@/lib/next-auth/options";
import { fetchAllBooks } from "@/lib/microcms/read";
import { BookType } from "@/types/book";
import { UserType } from "@/types/user";
import { PurchaseType } from "@/types/purchase";
import Book from "./_components/Book";

export default async function Home() {
  const books = await fetchAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const userId = (session?.user as UserType)?.id;

  const purchasedBookIds: string[] = [];
  if (userId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/api/purchases/${userId}`
    );
    const purchases = await response.json();
    purchases.forEach((purchase: PurchaseType) => {
      purchasedBookIds.push(purchase.bookId);
    });
  }

  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Book Commerce
      </h2>
      {books.contents.map((book: BookType) => {
        return (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchasedBookIds.includes(book.id)}
          />
        );
      })}
    </main>
  );
}
