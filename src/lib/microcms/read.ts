import { BookType } from "@/types/book";
import { client } from "./client";

export const fetchAllBooks = async () => {
  return await client.getList<BookType>({ endpoint: "books" });
};

export const fetchBookDetail = async (bookId: string) => {
  return await client.getListDetail<BookType>({
    endpoint: "books",
    contentId: bookId,
  });
};
