import React, { useState, useEffect, useRef } from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { usePost, useCurrentUser, useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { defaultProfilePicture } from "@/lib/default";
import { addCount } from "@/components/post/posts"
import toast, { Toaster } from "react-hot-toast";
import { JsonWebTokenError } from "jsonwebtoken";

// import styles from '@/styles/posts.module.css'
import { SearchIcon } from '@/components/icons'

function Post({ post }) {
  const [userInfo, { mutate }] = useCurrentUser();
  const user = useUser(post.creatorId);
  // const [isUpdating, setIsUpdating] = useState(false);
  var isUpdating = false;

  const handleClick = async (event) => {
    if (userInfo) {
      console.log('I am clicked');
      var dupCheck = false;
      var choose;
      event.preventDefault();
      console.log(isUpdating);
      if (isUpdating) return;
      isUpdating = true;
      const formData = new FormData();

      //console.log(dupCheck);
      for (var i = 0; i < post.likes.length; i++) {
        if (post.likes[i] === userInfo._id) {
          dupCheck = true;
        }
      }

      if (!dupCheck) {
        choose = "Add";
      }
      else {
        choose = "Remove";
      }
      //console.log(choose);
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
        // setMsg({ message: "Your profile has been updated." });
        toast.success("Likes Updated!");
      } else {
        // setMsg({ message: await res.text(), isError: true });
        toast.error("Likes failed to update!");
        setIsUpdating(false);
        console.log('Hello');
      }
      isUpdating = false;
    }
    else {
      toast.error("Please sign-in!");
    }
  };
  //const comment = 

  const postDelete = async (event) => {
    if (userInfo) {
      const body = {
        postId: post._id,
      };
      fetch("/api/posts/patch", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    else {
      toast.error("Please sign-in!");
    }
  };

  return (
    <div
      className="bg-white flex flex-col flex-1 p-6 shadow-md hover:shadow-xl
                  transition duration-200 ease-in-out rounded-md
                   w-full transform hover:scale-102
                  dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      {user && (
        <Link href={`/user/${user._id}`}>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col justify-center h-full">
              <img src={post.postPicture} className="pb-6" alt="post image" />
            </div>
            <div>
              <a className="flex text-blue-600 items-center">
                <img
                  width="27"
                  height="27"
                  className="rounded-full mr-2"
                  src={user.profilePicture || defaultProfilePicture(user._id)}
                  alt={user.firstname}
                />
                <span className="text-medium cursor-pointer text-blue-500 dark:text-blue-400 hover:underline">
                  @{user.username}
                </span>
              </a>
            </div>
          </div>
        </Link>
      )}
      <p>{post.caption}</p>
      <p className="text-sm text-gray-400">
        {new Date(post.createdAt).toLocaleString()}
      </p>
      {user && (
        <Link href={`/comments/${post._id}`}>
          <span className="text-medium cursor-pointer">Comments</span>
        </Link>
      )}
      {/* {console.log(post.caption)} */}
      <button onClick={handleClick}> Likes: {post.likes.length} </button>
      <button onClick={postDelete}>Delete</button>
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
      refreshInterval: 3000, // Refresh every 3 seconds
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


  const [searchValue, setSearchValue] = React.useState('')
  //console.log("Search");
  //console.log(data?.[0].posts[0].caption);
  //console.log(typeof data?.[0].posts);
  // const filteredPosts = Object(data?.[0].posts)
  //   .filter(
  //     (post) => {
  //       console.log(post.caption)
  //       post.caption.toLowerCase().includes(searchValue.toLowerCase()) || searchValue == ""
  //       console.log(searchValue)
  //     }//  ||
  //     // post.description
  //     //   ?.toLowerCase()
  //     //   .includes(searchValue.toLowerCase()) 
  //   )
  // console.log(filteredPosts)
  var filteredPosts = [];
  for (var i = 0; i < data?.[0].posts?.length; i++) {
    if (data?.[0].posts[i].caption.toLowerCase().includes(searchValue.toLowerCase()) || searchValue == "") {
      filteredPosts.push(data?.[0].posts[i]);
    }
  }
  console.log(filteredPosts);

  console.log(searchValue);
  return (
    <div>
      <div className="">
        <input
          aria-label="Enabled Searchbar"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Posts"
          className=""
        />
        {/* <svg className="">
          <SearchIcon />
        </svg> */}
      </div>

      <div className="w-full mx-auto grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 border-2 border-red-200">
        {!filteredPosts.length &&
          posts.map((post) => (
            <Post key={post._id} post={post} />
          ))
        }
        {filteredPosts.length &&
          filteredPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))
        }
      </div>
      {!isReachingEnd && (
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
      )}
    </div>
  );
}
