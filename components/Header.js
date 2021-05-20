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
    <nav className="sticky-nav bg-black bg-opacity-80 text-gray-50 flex w-full p-6">
      <ul className="flex flex-row w-full max-w-7xl mx-auto justify-between items-center">
        <Link href="/">
          <a>
            <h1 className="cursor-pointer">Auto Exposure</h1>
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
                <a className="cursor-pointer">Sign up</a>
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
