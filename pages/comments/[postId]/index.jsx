import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { all } from "@/middlewares/index";
import { useCurrentPost } from "@/hooks/index";
import Posts from "@/components/post/posts";
import { extractPost } from "@/lib/api-helpers";
import { findPostById } from "@/db/index";
import { defaultProfilePicture } from "@/lib/default";
import toast, { Toaster } from "react-hot-toast";
import Comment from "@/components/comment/comments"

export default function PostPage({ post }) {
    if (!post) return <Error statusCode={404} />;
    const { caption, creatorId, postPicture, likes } = post || {};
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
            <section className="mx-auto w-full max-w-screen-2xl">
                <div className="flex md:flex-row flex-col items-center md:space-x-6">
                    <img
                        src={postPicture || defaultProfilePicture(_id)}
                        alt={caption}
                        className="rounded-full md:h-52 md:w-52 h-36 w-36 m-6"
                    />
                    <div>
                        <div className="flex flex-col space-y-3">
                            <h2 className="font-medium text-xl text-gray-600 dark:text-gray-400">
                                @{creatorId}
                            </h2>
                            {!isCurrentPost && (
                                <h1 className="font-bold text-3xl tracking-loose">
                                    {caption}
                                </h1>
                            )}
                            {isCurrentPost && (
                                <h1 className="font-bold text-3xl tracking-loose">
                                    {caption}
                                </h1>
                            )}
                            {/* <h2 className="font-medium text-xl text-gray-600 dark:text-gray-400">
                                About
                            </h2>
                            <p>{bio}</p> */}
                        </div>
                        {isCurrentPost && (
                            <Link href="/settings">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-black rounded-sm py-2 px-3 mt-4
                  hover:bg-gray-300 hover:border-gray-300 hover:shadow-lg transition duration-200 ease-in-out
                             dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white"
                                >
                                    Edit Profile
                </button>
                            </Link>
                        )}
                    </div>
                </div>

                <div>
                    {!isCurrentPost && (
                        <h3 className="text-2xl text-gray-600 font-semibold my-4 dark:text-gray-400">
                            {creatorId}'s Comments
                        </h3>
                    )}
                    {isCurrentPost && (
                        <h3 className="text-2xl text-gray-600 font-semibold my-4 dark:text-gray-400">
                            My Comments
                        </h3>
                    )}

                    {/* {console.log(post)} */}
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className="space-y-2 min-w-full max-w-sm"
                    >
                        <div className="flex flex-col">
                            <label className="font-medium">Message</label>
                            <input
                                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                                        dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-blue-600"
                                type="text"
                                id="message"
                                name="message"
                                placeholder=""
                                ref={messageRef}
                            />
                        </div>
                        <button
                            id="buttonid"
                            type="submit"
                            className="w-full bg-black rounded-sm py-2 px-6 text-white font-medium 
                            hover:bg-gray-800 hover:shadow-md transition duration-200 ease-in-out
                                        dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black"
                        >
                            Post
                        </button>
                    </form>
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
            post
        }
    };
}
