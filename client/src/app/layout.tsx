import type { Metadata } from "next";

import "./globals.scss";
import Header from "./_components/global/Header/Header";
import StoreProvider from "../store/StoreProvider";
import ApolloClientProvider from "../apollo/ApolloClientProvider";

export const metadata: Metadata = {
  title: "DataFalcon"
};


const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>
          <StoreProvider>
            <Header />
            {children}
          </StoreProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;