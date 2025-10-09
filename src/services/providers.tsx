"use client";

import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import { ClerkProvider } from "@clerk/nextjs";

import { Layout } from "../layout/Layout";
import { client } from "./apolloClient";

export const THEMES_ARRAY = ["light", "dark"];

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ApolloProvider client={client}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          themes={THEMES_ARRAY}
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </ApolloProvider>
    </ClerkProvider>
  );
};
