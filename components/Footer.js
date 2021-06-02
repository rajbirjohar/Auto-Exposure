import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/icons/icons";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <footer className="mx-auto w-full max-w-screen-2xl text-center md:px-0 px-6">
      <div className="border-t-2 border-gray-200 dark:border-gray-800 py-16">
        <p>
          Built with ❤️ by the Auto Exposure Team. <br /> By car enthusiasts,
          for car enthusiasts.
        </p>

        <div className="cursor-pointer mt-6 flex justify-center w-full mx-auto">
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center hover:shadow-lg
                 transition duration-200 ease-in-out rounded-sm
                 bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 px-6 py-3"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && (
              <span>
                {resolvedTheme === "dark" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="h-5 w-5 flex items-center mr-1 mb-1"
                    >
                      <SunIcon />
                    </svg>
                    Light
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="h-5 w-5 flex items-center mr-1 mb-1"
                    >
                      <MoonIcon />
                    </svg>
                    Dark
                  </>
                )}
              </span>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
