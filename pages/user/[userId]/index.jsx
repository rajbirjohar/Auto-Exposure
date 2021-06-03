import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/icons/icons";
import { all } from "@/middlewares/index";
import { useCurrentUser } from "@/hooks/index";
import Posts from "@/components/post/posts";
import { extractUser } from "@/lib/api-helpers";
import { findUserById } from "@/db/index";
import { defaultProfilePicture } from "@/lib/default";

export default function UserPage({ user }) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);

  if (!user) return <Error statusCode={404} />;
  const { firstname, username, bio, profilePicture, _id } = user || {};
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === user._id;
  return (
    <>
      <Head>
        <title>Auto Exposure | {firstname}</title>
      </Head>
      <section className="mx-auto w-full max-w-screen-2xl">
        <div className="flex md:flex-row flex-col items-center md:space-x-6">
          <img
            src={profilePicture || defaultProfilePicture(_id)}
            alt={firstname}
            className="rounded-full md:h-52 md:w-52 h-40 w-40 mb-6"
          />
          <div>
            <div className="flex flex-col md:space-y-3">
              <h2 className="font-medium md:text-xl text-gray-600 dark:text-gray-400">
                @{username}
              </h2>
              {!isCurrentUser && (
                <h1 className="font-semibold text-lg md:text-3xl tracking-loose">
                  Welcome to {firstname}'s garage.
                </h1>
              )}
              {isCurrentUser && (
                <h1 className="font-semibold text-lg md:text-3xl tracking-loose">
                  Welcome to your garage, {firstname}.
                </h1>
              )}
              <h2 className="font-medium md:text-xl text-gray-600 dark:text-gray-400">
                About
              </h2>
              <p>{bio}</p>
            </div>
            <div className="flex flex-row cursor-pointer space-x-3 mt-4">
              {isCurrentUser && (
                <Link href="/settings">
                  <button
                    type="button"
                    className="bg-black text-white rounded-sm px-3 font-medium
                    hover:bg-gray-800 hover:shadow-lg transition duration-200 ease-in-out
                              dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black"
                  >
                    Edit Profile
                  </button>
                </Link>
              )}

              <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="hover:shadow-lg p-2
                    transition duration-200 ease-in-out rounded-sm text-black dark:text-white font-medium
                    bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              >
                {mounted && (
                  <>
                    {resolvedTheme === "dark" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <SunIcon />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <MoonIcon />
                      </svg>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          {!isCurrentUser && (
            <h3 className="md:text-xl text-gray-600 font-medium my-4 dark:text-gray-400">
              {firstname}'s Posts
            </h3>
          )}
          {isCurrentUser && (
            <h3 className="md:text-xl text-gray-600 font-medium my-4 dark:text-gray-400">
              My Posts
            </h3>
          )}
          <Posts creatorId={user._id} />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const user = extractUser(
    await findUserById(context.req.db, context.params.userId)
  );
  if (!user) context.res.statusCode = 404;
  return { props: { user } };
}
