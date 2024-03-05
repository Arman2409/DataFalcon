import type { Metadata } from "next";

import "../styles/globals.scss";
import StoreProvider from "../store/StoreProvider";
import Header from "./_components/Home/Header/Header";

export const metadata: Metadata = {
  title: "DataFalcon",
  description: "Web Crawler"
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;