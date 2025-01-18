import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthProvider from "@/lib/next-auth/provider";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Book Commerce",
  description: "Book Commerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.className} antialiased`}>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
