import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/icons/icons";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <footer className="mx-auto w-full max-w-screen-2xl">
      <div
        className="flex md:flex-row flex-col justify-between
      text-gray-500 dark:text-gray-400 border-t-2 border-gray-200 dark:border-gray-800 py-16 mx-6"
      >
        <p>
          Built with ❤️ by the Auto Exposure Team. <br /> By car enthusiasts,
          for car enthusiasts.
        </p>

        <div className="cursor-pointer md:mt-0 mt-4">
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex flex-row items-center hover:shadow-lg
                 transition duration-200 ease-in-out rounded-sm text-black dark:text-white font-medium
                 bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 px-6 py-3"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && (
              <span>
                {resolvedTheme === "dark" ? (
                  <span className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="h-5 w-5 flex items-center mr-1"
                    >
                      <SunIcon />
                    </svg>
                    Light
                  </span>
                ) : (
                  <span className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="h-5 w-5 flex items-center mr-1"
                    >
                      <MoonIcon />
                    </svg>
                    Dark
                  </span>
                )}
              </span>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
