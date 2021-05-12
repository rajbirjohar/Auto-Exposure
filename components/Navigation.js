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
      <ul className="flex">
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
            >
              Logout
            </button>
          </>
        )}

        {!loggedIn && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </ul>
    </nav>
  );
}
