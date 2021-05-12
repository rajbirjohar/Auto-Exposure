import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

export default function Navigation() {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <nav className="sticky-nav bg-black bg-opacity-80 text-gray-50 flex justify-end py-4 px-4 md:px-12 w-full">
      <ul className="flex space-x-4 items-center">
        <Link href="/">Home</Link>
        {loggedIn && <Link href="/profile">Profile</Link>}
        <Link href="/feed">Feed</Link>
        {!loggedIn && (
          <>
            <Link href="/login">
              <button className="bg-gray-100 text-black py-1 px-3 rounded-md">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-black text-white py-1 px-3 rounded-md">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
