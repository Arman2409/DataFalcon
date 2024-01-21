import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "./_components/global/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tennis"
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <Header />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;