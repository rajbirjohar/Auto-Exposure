import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { all } from "@/middlewares/index";
import { useCurrentPost, useCurrentUser, useUser } from "@/hooks/index";
import Posts from "@/components/post/posts";
import { extractPost } from "@/lib/api-helpers";
import { findPostById } from "@/db/index";
import { defaultProfilePicture } from "@/lib/default";
import toast, { Toaster } from "react-hot-toast";
import Comment from "@/components/comment/comments";

export default function PostPage({ post }) {
  if (!post) return <Error statusCode={404} />;
  const { caption, postPicture, likes } = post || {};
  const user = useUser(post.creatorId);
  const [userLoggedIn] = useCurrentUser();
  const [currentPost] = useCurrentPost();
  const isCurrentPost = currentPost?._id === post._id;
  const messageRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", messageRef.current.value);

    const body = {
      postId: post._id,
      message: messageRef.current.value,
      //userId: currentUser._id,
    };
    console.log(messageRef.current.value);

    if (!e.currentTarget.message.value) return;
    e.currentTarget.message.value = "";

    const res = await fetch("/api/posts/patch", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      // setMsg("Posted!");
      // setTimeout(() => setMsg(null), 5000);
      toast.success("Posted!");
    }
  }

  return (
    <>
      <Head>
        <title>Auto Exposure | {caption}</title>
      </Head>
      <section className="mx-auto w-full max-w-screen-lg">
        {user && (
          <div className="flex flex-col">
            <img
              src={postPicture || defaultProfilePicture(_id)}
              alt="Image"
              className="w-full mb-16"
            />
            <div className="w-full">
              <div className="flex flex-col space-y-3">
                <div className="flex md:flex-row flex-col space-y-2 md:space-y-0 space-x-2">
                  <h2 className="text-medium text-3xl font-semibold cursor-pointer text-blue-500 dark:text-blue-400 hover:underline">
                    @{user.username}{" "}
                  </h2>
                  <span className="text-medium w-full text-3xl font-normal text-gray-400 dark:text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
                <h1 className="font-medium text-3xl tracking-loose">
                  {caption}
                </h1>
              </div>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-2xl text-gray-600 font-medium my-4 dark:text-gray-400 dark:text-gray-500">
            Comments
          </h3>
          {userLoggedIn ? (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="space-x-2 flex items-center w-full my-4"
            >
              <input
                className="flex-1 form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                                        dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-blue-600"
                type="text"
                id="message"
                name="message"
                placeholder=""
                ref={messageRef}
              />

              <button
                id="buttonid"
                type="submit"
                className="bg-black rounded-sm py-2 px-6 text-white font-medium 
                            hover:bg-gray-800 hover:shadow-md transition duration-200 ease-in-out
                                        dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <h2 className="font-medium text-xl text-gray-400 my-4 dark:text-gray-500">
              Sign in to comment.
            </h2>
          )}

          <Comment postId={post._id} />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  console.log(context.params);
  const post = await findPostById(context.req.db, context.params.postId);
  if (!post) context.res.statusCode = 404;
  console.log(post);
  return {
    props: {
      post,
    },
  };
}
