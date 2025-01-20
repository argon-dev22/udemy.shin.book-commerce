"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PurchaseSuccess = () => {
  const [bookId, setBookId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      return;
    }
    const createPurchaseHistory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/api/checkout/success`,
          {
            method: "POST",
            body: JSON.stringify({ sessionId }),
          }
        );
        const result = await res.json();
        setBookId(result.purchase.bookId);
      } catch (error) {
        console.error(error);
      }
    };
    createPurchaseHistory();
  }, []);

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          購入ありがとうございます！
        </h1>
        <p className="text-center text-gray-600">
          ご購入いただいた内容の詳細は、登録されたメールアドレスに送信されます。
        </p>
        <div className="mt-6 text-center">
          <Link
            href={`/book/${bookId}`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            購入した記事を読む
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
