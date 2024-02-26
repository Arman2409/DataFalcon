import type { Metadata } from "next";

import "../styles/globals.scss";
import StoreProvider from "../store/StoreProvider";

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
          <StoreProvider>
            {children}
          </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;