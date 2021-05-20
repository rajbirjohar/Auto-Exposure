import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";
import Header from "@/components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Auto Exposure</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Auto Exposure is a social medium aimed towards car enthusiasts."
        />
        <meta property="og:title" content="Auto Exposure" />
        <meta
          property="og:description"
          content="Auto Exposure is a social medium aimed towards car enthusiasts."
        />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col w-full mx-auto md:mt-12 mt-4 p-6 leading-7">
        {children}
      </main>
      <footer className="w-full max-w-7xl mx-auto text-center">
        <p>Auto Exposure Footer. We can put our names here.</p>
      </footer>
    </>
  );
}
