import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import cookie from "js-cookie";

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
    <nav className="sticky-nav bg-black bg-opacity-80 text-gray-50 flex justify-end w-full">
      <ul className="flex space-x-4 items-center justify-end max-w-7xl w-full py-4 px-4 md:px-12">
        <Link href="/">Home</Link>
        <Link href="/feed">Feed</Link>
        {loggedIn && (
          <div className="space-x-4">
            <Link href="/profile">Profile</Link>
            <button
              onClick={() => {
                cookie.remove("token");
                revalidate();
              }}
              className="bg-gray-200 text-black py-1 px-3 rounded-md"
            >
              Logout
            </button>
          </div>
        )}

        {!loggedIn && (
          <div className="flex space-x-4">
            <Link href="/login">
              <a className="bg-gray-200 text-black py-1 px-3 rounded-md">
                Login
              </a>
            </Link>
            <Link href="/signup">
              <button className="bg-black text-white py-1 px-3 rounded-md">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
