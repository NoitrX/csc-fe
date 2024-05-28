import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrelineScript from "../../app/components/PrelineScript";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODOLIST",
  description: "Todolist Naufhal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrelineScript />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
