import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import cookie from "js-cookie";

export default function Navigation() {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1></h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <nav className="sticky-nav bg-black bg-opacity-80 text-gray-50 flex justify-end w-full p-4">
      <ul className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/feed">Feed</Link>
        {loggedIn && (
          <>
            <Link href="/profile">Profile</Link>
            <button
              onClick={() => {
                cookie.remove("token");
                revalidate();
              }}
              className="bg-gray-200 text-black rounded-md py-1 px-3 font-medium"
            >
              Logout
            </button>
          </>
        )}

        {!loggedIn && (
          <div className="space-x-4">
            <Link href="/login">
              <button className="bg-gray-200 text-black rounded-md py-1 px-3 font-medium">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-black text-white rounded-md py-1 px-3 font-medium">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
