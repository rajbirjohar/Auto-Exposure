import Layout from "../components/Layout";
// import useSWR from 'swr';
// import fs from 'fs';

// export default function Home() {
//   const {data, revalidate} = useSWR('/api/me', async function(args) {
//     const res = await fetch(args);
//     return res.json();
//   });
//   if (!data) return <h1>Loading...</h1>;
//   let loggedIn = false;
//   if (data.email) {
//     loggedIn = true;
//   }
//   return (
//     <Layout main>
//       <section className="mx-auto">
//         <div className="h-screen">
//           <h1>Home Page</h1>
//         </div>
//         <div className="h-screen">
//           <h1>Details</h1>
//         </div>
//         {loggedIn && (
//           <>
//             <p>Welcome {data.email}!</p>
//             <button
//               onClick={() => {
//                 cookie.remove('token');
//                 revalidate();
//               }}>
//               Logout
//             </button>
//           </>
//         )}
//         {!loggedIn && (
//           <>
//             <Link href="/login">Login</Link>
//             <p>or</p>
//             <Link href="/signup">Sign Up</Link>
//           </>
//         )}
//       </section>
//     </Layout>
//   );
// }

import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';

function Home() {
  const {data, revalidate} = useSWR('/api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Simplest login</h1>

      <h2>Proudly using Next.js, Mongodb and deployed with Now</h2>
      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <button
            onClick={() => {
              cookie.remove('token');
              revalidate();
            }}>
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
          <Link href="/login"><a className="underline">Login</a></Link>
          <p>or</p>
          <Link href="/signup"><a className="underline">Sign Up</a></Link>
        </>
      )}
    </div>
  );
}

export default Home;
