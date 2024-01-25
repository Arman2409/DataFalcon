"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>;
};

export default ApolloClientProvider;