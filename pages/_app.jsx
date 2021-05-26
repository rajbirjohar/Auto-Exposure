import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import Layout from "@/components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Auto Exposure</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
