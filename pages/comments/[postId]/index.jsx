import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { all } from "@/middlewares/index";
import { useCurrentPost } from "@/hooks/index";
import Posts from "@/components/post/posts";
import { extractPost } from "@/lib/api-helpers";
import { findPostById } from "@/db/index";
import { defaultProfilePicture } from "@/lib/default";

export default function PostPage({ post }) {
    if (!post) return <Error statusCode={404} />;
    const { caption, creatorId, postPicture, likes } = post || {};
    const [currentPost] = useCurrentPost();
    const isCurrentPost = currentPost?._id === post._id;
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

                    {console.log(post)}
                    {/* <Posts _id={post._id} /> */}
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
