import React from "react";
import router from "next/router";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";

import { useTheme } from "next-themes";

export default function Header({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    router.push("/");
    mutate(null);
  };

  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <nav className="sticky-nav bg-black bg-opacity-80 text-gray-50 flex w-full p-6 dark:bg-white dark:text-black dark:bg-opacity-80">
      <div className="button">
        <button onClick={switchTheme}>Change theme</button>
      </div>
      <ul className="flex flex-row w-full max-w-7xl mx-auto justify-between items-center">
        <Link href="/">
          <a>
            <h1 className="cursor-pointer">
              <span className="font-extrabold text-2x1">A</span>uto{" "}
              <span className="font-extrabold">E</span>xposure
            </h1>
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
