import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flashcards",
  description:
    "Flashcards transforms essential information into engaging, interactive flashcards, making studying more effective and enjoyable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Navbar></Navbar>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
