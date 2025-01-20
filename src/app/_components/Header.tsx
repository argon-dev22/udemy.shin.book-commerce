import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@/lib/next-auth/options";
import { UserType } from "@/types/user";
import SignOutButton from "./SignOutButton";

export default async function Header() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  const navCss =
    "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Book Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/" className={navCss}>
            ホーム
          </Link>
          {session ? (
            <SignOutButton navCss={navCss} />
          ) : (
            <Link href="/login" className={navCss}>
              ログイン
            </Link>
          )}

          <Link href="/profile">
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={user?.image || "/default_icon.png"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
