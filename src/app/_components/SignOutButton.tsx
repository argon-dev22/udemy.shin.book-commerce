"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function SignOutButton({ navCss }: { navCss: string }) {
  const handleSignOut = () => {
    if (confirm("ログアウトしますか？")) {
      signOut({ callbackUrl: "/login" });
    }
  };

  return (
    <button onClick={handleSignOut} className={navCss}>
      ログアウト
    </button>
  );
}
