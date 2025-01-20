import Image from "next/image";
import React from "react";
import { fetchBookDetail } from "@/lib/microcms/read";

const BookDetail = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;
  const book = await fetchBookDetail(bookId);
  const publishedAt =
    new Date(book.publishedAt ?? "").toLocaleString() || "no date";
  const updatedAt =
    new Date(book.updatedAt ?? "").toLocaleString() || "no date";

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={book.thumbnail.url}
          alt="book image"
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">公開日: {publishedAt}</span>
            <span className="text-sm text-gray-500">最終更新: {updatedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
