import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { nextAuthOptions } from "@/lib/next-auth/options";
import { fetchBookDetail } from "@/lib/microcms/read";
import { UserType } from "@/types/user";
import { PurchaseType } from "@/types/purchase";
import { BookType } from "@/types/book";
import PurchaseDetailBook from "../_components/PurchaseDetailBook";

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions);
  const user: UserType = session?.user as UserType;

  let purchaseDetailBooks: BookType[] = [];
  if (user) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/api/purchases/${user.id}`
    );
    const purchases = await res.json();
    const tmpPurchaseDetailBooks = await Promise.all(
      purchases.map(async (purchase: PurchaseType) => {
        return await fetchBookDetail(purchase.bookId);
      })
    );
    purchaseDetailBooks = tmpPurchaseDetailBooks;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user?.image ?? "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-t-md"
          />
          <h2 className="text-lg ml-4 font-semibold">
            お名前：
            {user?.name ?? (
              <p>
                ログインしていません。ログインページは
                <Link href="/login" className="text-blue-500 underline">
                  こちら
                </Link>
              </p>
            )}
          </h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">購入した記事</span>
      <div className="flex items-center gap-6">
        {purchaseDetailBooks.map((purchaseDetailBook: BookType) => (
          <PurchaseDetailBook
            key={purchaseDetailBook.id}
            purchaseDetailBook={purchaseDetailBook}
          />
        ))}
      </div>
    </div>
  );
}
