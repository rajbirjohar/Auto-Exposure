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
    <nav className="sticky-nav bg-black bg-opacity-80 text-gray-50 flex justify-end w-full">
      <ul className="flex space-x-4 items-center justify-end max-w-7xl w-full py-4 px-4 md:px-12">
        <Link href="/"><a className="mr-2">Home</a></Link>
        <Link href="/feed"><a className="mx-2">Feed</a></Link>
        {loggedIn && (
          <div className="flex items-center space-x-4">
            <Link href="/profile">Profile</Link>
            <button
              onClick={() => {
                cookie.remove("token");
                revalidate();
              }}
              className="mx-2"
            >
              Logout
            </button>
          </div>
        )}

        {!loggedIn && (
          <div className="flex items-center space-x-4">
            <Link href="/login"><a className="mx-2">Login</a></Link>
            <Link href="/signup"><a className="ml-2">Sign Up</a></Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
