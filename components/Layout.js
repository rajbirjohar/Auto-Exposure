import Head from "next/head";

export const siteTitle = "Auto Exposure";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content="Instagram but for cars." />
      </Head>
      <body>
        <main className="flex flex-col max-w-7xl mx-auto md:mt-12 mt-4 p-6 leading-7">
          {children}
        </main>
      </body>
    </html>
  );
}
