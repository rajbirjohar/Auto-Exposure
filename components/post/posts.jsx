import React from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { defaultProfilePicture } from "@/lib/default";

function Post({ post }) {
  const user = useUser(post.creatorId);
  return (
    <div
      className="bg-white flex flex-col flex-1 p-6 shadow-md hover:shadow-xl
                  transition duration-200 ease-in-out rounded-lg w-full border-2 border-gray-50 transform hover:scale-102
                  dark:bg-gray-700 dark:border-gray-800 dark:hover:border-gray-50"
    >
      {user && (
        <Link href={`/user/${user._id}`}>
          <div>
            <div className="">
              <img
                src={post.postPicture}
                className="pb-6 fill h-full"
                alt="post image"
              />
            </div>
            <a className="flex text-blue-600 items-center">
              <img
                width="27"
                height="27"
                className="rounded-full mr-2"
                src={user.profilePicture || defaultProfilePicture(user._id)}
                alt={user.firstname}
              />
              <span className="text-medium cursor-pointer">
                @{user.username}
              </span>
            </a>
          </div>
        </Link>
      )}
      <p>{post.caption}</p>
      <p className="text-sm text-gray-400">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

const PAGE_SIZE = 9;

export function usePostPages({ creatorId } = {}) {
  return useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      // first page, previousPageData is null
      if (index === 0) {
        return `/api/posts?limit=${PAGE_SIZE}${
          creatorId ? `&by=${creatorId}` : ""
        }`;
      }

      // using oldest posts createdAt date as cursor
      // We want to fetch posts which has a datethat is
      // before (hence the .getTime() - 1) the last post's createdAt
      const from = new Date(
        new Date(
          previousPageData.posts[previousPageData.posts.length - 1].createdAt
        ).getTime() - 1
      ).toJSON();

      return `/api/posts?from=${from}&limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ""
      }`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export default function Posts({ creatorId }) {
  const { data, error, size, setSize } = usePostPages({ creatorId });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0].posts?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts.length < PAGE_SIZE);

  return (
    <div>
      <div className="w-full mx-auto grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      {!isReachingEnd && (
        <div className="flex w-full mx-auto mt-8 items-center justify-center">
          <button
            type="button"
            className="bg-gray-200 text-black rounded-sm py-2 px-6 font-medium
             hover:bg-gray-100 transition duration-200 ease-in-out dark:bg-gray-900 dark:text-white"
            onClick={() => setSize(size + 1)}
            disabled={isReachingEnd || isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
