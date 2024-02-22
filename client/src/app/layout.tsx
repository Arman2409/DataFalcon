import type { Metadata } from "next";

import "../styles/globals.scss";
import StoreProvider from "../store/StoreProvider";
import ApolloClientProvider from "../apollo/ApolloClientProvider";
import Header from "./_components/global/Header/Header";

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