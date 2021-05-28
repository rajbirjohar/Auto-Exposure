import React from "react";
import router from "next/router";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";

export default function Header({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    router.push("/");
    mutate(null);
  };

  return (
    <nav
      className="sticky-nav bg-gray-50 text-black dark:bg-black dark:text-white
     bg-opacity-80 flex w-full p-6"
    >
      <ul className="flex flex-row mx-auto w-full max-w-screen-2xl mx-auto justify-between items-center">
        <Link href="/">
          <a>
            <h1 className="cursor-pointer text-lg font-medium">Æ</h1>
          </a>
        </Link>
        <div>
          {!user ? (
            <li className="space-x-6">
              <Link href="/">
                <a>
                  <a className="cursor-pointer">Feed</a>
                </a>
              </Link>
              <Link href="/login">
                <a className="cursor-pointer">Sign in</a>
              </Link>
              <Link href="/signup">
                <button
                  className="bg-black text-white rounded-sm py-2 px-3
                  hover:bg-gray-800 hover:shadow-lg transition duration-200 ease-in-out
                            dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black"
                >
                  Sign up
                </button>
              </Link>
            </li>
          ) : (
            <li className="space-x-6">
              <Link href="/">
                <a>
                  <a className="cursor-pointer">Feed</a>
                </a>
              </Link>
              <Link href={`/user/${user._id}`}>
                <a className="cursor-pointer">Profile</a>
              </Link>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a tabIndex={0} role="button" onClick={handleLogout}>
                Logout
              </a>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}
