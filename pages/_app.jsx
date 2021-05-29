import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import Layout from "@/components/layout";

import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Head>
          <title>Auto Exposure</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
