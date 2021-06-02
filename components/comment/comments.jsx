import React from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";

function Comment({ post }) {
  const user = useUser(post.creatorId);
  return (
    <div
      className="bg-white flex flex-col flex-1 p-6 shadow-md hover:shadow-lg
                  transition duration-200 ease-in-out rounded-md
                   w-full transform hover-hover:hover:scale-101
                  dark:bg-gray-900 dark:hover:bg-gray-800 mb-4"
    >
      {user && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex space-x-1">
            <Link href={`/user/${user._id}`}>
              <h3 className="text-medium cursor-pointer text-blue-500 dark:text-blue-400 hover:underline">
                @{user.username}{" "}
              </h3>
            </Link>
            <span className="text-gray-400 font-normal hover:no-underline">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <span>{post.message}</span>
        </div>
      )}
    </div>
  );
}

const PAGE_SIZE = 9;

export function usePostPages({ postId } = {}) {
  return useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      console.log("postPages yo");
      if (previousPageData && previousPageData.posts.length === 0) return null;

      // first page, previousPageData is null
      if (index === 0) {
        return `/api/posts/patch?id=${postId}`;
      }

      const from = new Date(
        new Date(
          previousPageData.posts[previousPageData.posts.length - 1].createdAt
        ).getTime() - 1
      ).toJSON();

      return `/api/posts/patch?id=${postId}`;
    },
    fetcher,
    {
      refreshInterval: 1000, // Refresh every 1 seconds
    }
  );
}

export default function Comments({ postId }) {
  const { data } = usePostPages({ postId });
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div>
      <div className="w-full">
        {posts.map((post) => (
          <Comment key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
