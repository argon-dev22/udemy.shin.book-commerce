import { BookType } from "@/types/book";
import { client } from "./client";

export const fetchAllBooks = async () => {
  return await client.getList<BookType>({ endpoint: "books" });
};
