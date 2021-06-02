import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { all } from "@/middlewares/index";
import { useCurrentPost, useCurrentUser, useUser } from "@/hooks/index";
import { findPostById } from "@/db/index";
import { defaultProfilePicture } from "@/lib/default";
import toast, { Toaster } from "react-hot-toast";
import Comment from "@/components/comment/comments";
import TimeAgo from "react-timeago";

export default function PostPage({ post }) {
  if (!post) return <Error statusCode={404} />;
  const { caption, postPicture, likes } = post || {};
  const user = useUser(post.creatorId);
  const [userLoggedIn] = useCurrentUser();
  const [currentPost] = useCurrentPost();
  const messageRef = useRef();
  const age = new Date(post.createdAt).toLocaleString();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", messageRef.current.value);

    const body = {
      postId: post._id,
      message: messageRef.current.value,
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
      toast.success("Posted!");
    }
  }

  return (
    <>
      <Head>
        <title>Auto Exposure | {caption}</title>
      </Head>
      <Toaster />
      <section className="mx-auto w-full max-w-screen-lg">
        {user && (
          <div className="flex flex-col">
            <img
              src={postPicture || defaultProfilePicture(_id)}
              alt="Image"
              className="w-full mb-8 md:mb-16"
            />
            <div className="w-full">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Link href={`/user/${user._id}`}>
                    <a className="flex text-blue-600 items-center">
                      <img
                        width="45"
                        height="45"
                        className="rounded-full mr-2"
                        src={
                          user.profilePicture || defaultProfilePicture(user._id)
                        }
                        alt={user.firstname}
                      />
                      <p
                        className="md:text-xl font-semibold cursor-pointer 
                      text-blue-500 dark:text-blue-400 hover:underline"
                      >
                        @{user.username}{" "}
                      </p>
                    </a>
                  </Link>
                  <span className=" md:text-xl font-normal text-gray-400">
                    <TimeAgo date={age} />
                  </span>
                </div>
                <h1 className="md:text-xl mt-3 tracking-loose">{caption}</h1>
              </div>
            </div>
          </div>
        )}
        <div>
          <h3 className="md:text-xl text-gray-600 font-medium md:my-4 dark:text-gray-400">
            Comments
          </h3>
          {userLoggedIn ? (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="md:space-x-4 flex flex-col md:flex-row md:items-center w-full my-4"
            >
              <input
                className="flex-grow w-full md:mb-0 mb-4 form-input 
                border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
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
                className=" md:flex-none flex-grow bg-black rounded-sm py-2 px-6 text-white font-medium 
                            hover:bg-gray-800 hover:shadow-md transition duration-200 ease-in-out
                                        dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <h2 className="font-medium md:text-xl text-gray-400 mb-4 dark:text-gray-500">
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
