import React from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useCurrentUser, useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import TimeAgo from "react-timeago";
import toast, { Toaster } from "react-hot-toast";
import { DeleteIcon } from "@/icons/icons";

function Comment({ post }) {
  const user = useUser(post.creatorId);
  const [userInfo, { mutate }] = useCurrentUser();
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === post.creatorId;
  const age = new Date(post.createdAt).toLocaleString();
  const commentDelete = async (event) => {
    if (userInfo) {
      const body = {
        postId: post._id,
      };
      const res = await fetch("/api/comments/id=${postId}", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        toast.success("Comment Deleted!");
      }
    } else {
      toast.error("Please sign-in!");
    }
  };
  return (
    <div
      className="bg-white p-6 shadow-md hover:shadow-lg w-full
                  transition duration-200 ease-in-out rounded-md
                   w-full transform hover-hover:hover:scale-101
                  dark:bg-gray-900 dark:hover:bg-gray-800 mb-4"
    >
      {user && (
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <div className="flex space-x-1">
              <Link href={`/user/${user._id}`}>
                <h3 className="text-medium cursor-pointer text-blue-500 dark:text-blue-400 hover:underline">
                  @{user.username}{" "}
                </h3>
              </Link>
              <span className="text-gray-400 font-normal hover:no-underline">
                <TimeAgo date={age} />
              </span>
            </div>
            {isCurrentUser && (
              <button
                className="ring-2 ring-red-100 dark:ring-red-500 rounded-sm my-auto"
                onClick={commentDelete}
              >
                <svg className="text-red-500 dark:text-red-200 bg-red-100 dark:bg-red-500 w-6 h-6">
                  <DeleteIcon />
                </svg>
              </button>
            )}
          </div>
          <p className="md:pr-16 break-words break-normal">{post.message}</p>
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
      <Toaster />
      <div className="w-full">
        {posts.map((post) => (
          <Comment key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
