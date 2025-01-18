"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
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
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={navCss}
            >
              ログアウト
            </button>
          ) : (
            <Link href="/login" className={navCss}>
              ログイン
            </Link>
          )}

          <Link href={`/profile`}>
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
};

export default Header;
