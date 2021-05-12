import Layout from "../components/Layout";
import useSWR from 'swr';
import fs from 'fs';

export default function Home() {
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
    <Layout main>
      <section className="mx-auto">
        <div className="h-screen">
          <h1>Home Page</h1>
        </div>
        <div className="h-screen">
          <h1>Details</h1>
        </div>
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
            <Link href="/login">Login</Link>
            <p>or</p>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </section>
    </Layout>
  );
}
