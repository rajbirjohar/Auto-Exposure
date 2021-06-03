import React, { useState } from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useCurrentUser, useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { defaultProfilePicture } from "@/lib/default";
import toast, { Toaster } from "react-hot-toast";
import { HeartIcon, DeleteIcon } from "@/icons/icons";
import Modal from "@/components/Modal";
import useModal from "@/components/useModal";
import TimeAgo from "react-timeago";

// import styles from '@/styles/posts.module.css'
import { SearchIcon } from "@/components/icons";

function Post({ post }) {
  const { isShowing, toggle } = useModal();
  const [userInfo, { mutate }] = useCurrentUser();
  const user = useUser(post.creatorId);
  var isUpdating = false;
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === post.creatorId;
  const age = new Date(post.createdAt).toLocaleString();

  const handleClick = async (event) => {
    if (userInfo) {
      var dupCheck = false;
      var choose;
      event.preventDefault();
      console.log(isUpdating);
      if (isUpdating) return;
      isUpdating = true;

      for (var i = 0; i < post.likes.length; i++) {
        if (post.likes[i] === userInfo._id) {
          dupCheck = true;
        }
      }

      if (!dupCheck) {
        choose = "Add";
      } else {
        choose = "Remove";
      }
      const body = {
        postId: post._id,
        choice: choose,
      };
      console.log(body);
      const res = await fetch("/api/posts/patch", {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      isUpdating = false;
      if (res.status === 200) {
        const postData = await res.json();
        mutate({
          posts: {
            ...post,
            ...postData.post,
          },
        });
      } else {
        setIsUpdating(false);
      }
      isUpdating = false;
    } else {
      toast.error("Please sign-in!");
    }
  };

  const postDelete = async (event) => {
    if (userInfo) {
      const body = {
        postId: post._id,
      };
      const res = await fetch("/api/posts/patch", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        toast.success("Post Deleted!");
      }
    } else {
      toast.error("Please sign-in!");
    }
  };

  return (
    <div
      className="bg-white flex flex-col flex-1 p-6 shadow-md hover:shadow-lg
                  transition duration-200 ease-in-out rounded-md
                   w-full transform hover:scale-101
                  dark:bg-gray-900 dark:hover:bg-gray-800 truncate"
    >
      {user && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col justify-center h-full cursor-pointer">
            <Link href={`/comments/${post._id}`}>
              <img src={post.postPicture} className="pb-6 " alt="post image" />
            </Link>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              {/* <button className="flex items-center" onClick={handleClick}>
                <svg className="text-gray-400 w-6 h-6 mr-1">
                  <HeartIcon />
                </svg>
                {post.likes.length}
              </button> */}
              {isCurrentUser && (
                <>
                  <button
                    className="ring-2 ring-red-100 dark:ring-red-500 rounded-sm"
                    onClick={toggle}
                  >
                    <svg className="text-red-500 dark:text-red-200 bg-red-100 dark:bg-red-500 w-6 h-6">
                      <DeleteIcon />
                    </svg>
                  </button>
                  <Modal
                    isShowing={isShowing}
                    hide={toggle}
                    confirmDelete={postDelete}
                  />
                </>
              )}
            </div>
            <div className="flex space-x-1">
              <Link href={`/user/${user._id}`}>
                <a className="flex text-blue-600 items-center">
                  <img
                    width="27"
                    height="27"
                    className="rounded-full mr-2"
                    src={user.profilePicture || defaultProfilePicture(user._id)}
                    alt={user.firstname}
                  />
                  <p className="font-semibold cursor-pointer text-blue-500 dark:text-blue-400 hover:underline">
                    @{user.username}{" "}
                  </p>
                </a>
              </Link>
              <span className="font-normal text-gray-400 hover:no-underline no-underline">
                <TimeAgo date={age} />
              </span>
            </div>
          </div>
        </div>
      )}
      <p className="truncate">{post.caption}</p>

      {user && (
        <Link href={`/comments/${post._id}`}>
          <button
            className="text-medium cursor-pointer py-2 bg-gray-200
          hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 mt-4 rounded-sm"
          >
            Comments
          </button>
        </Link>
      )}
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
        return `/api/posts?limit=${PAGE_SIZE}${creatorId ? `&by=${creatorId}` : ""
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

      return `/api/posts?from=${from}&limit=${PAGE_SIZE}${creatorId ? `&by=${creatorId}` : ""
        }`;
    },
    fetcher,
    {
      refreshInterval: 1000, // Refresh every 1 seconds
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

  const [searchValue, setSearchValue] = React.useState("");
  var filteredPosts = [];
  for (var i = 0; i < data?.[0].posts?.length; i++) {
    if (
      data?.[0].posts[i].caption
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) {
      filteredPosts.push(data?.[0].posts[i]);
    }
  }
  console.log(filteredPosts);
  console.log(searchValue);

  return (
    <div>
      <Toaster />
      <div className="w-full md:max-w-lg md:pr-2 mb-6">
        <label className="font-medium">Search Posts</label>
        <input
          aria-label="Enabled Searchbar"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder=""
          className="w-full form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
          dark:bg-gray-800 dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-blue-600"
        />
      </div>
      <div className="w-full max-w-screen-2xl mx-auto grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      {/* {!isReachingEnd && (
        <div className="flex w-full mx-auto mt-8 items-center justify-center">
          <button
            type="button"
            className="bg-gray-200 text-black rounded-sm py-3 px-6
             hover:bg-gray-300 transition duration-200 ease-in-out
              dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white"
            onClick={() => setSize(size + 1)}
            disabled={isReachingEnd || isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )} */}
    </div>
  );
}
