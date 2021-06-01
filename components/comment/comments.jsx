import React, { useState, useEffect, useRef } from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { usePost, useCurrentUser, useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { defaultProfilePicture } from "@/lib/default";
import { addCount } from "@/components/post/posts"
import toast, { Toaster } from "react-hot-toast";
import { JsonWebTokenError } from "jsonwebtoken";

function Comment({ post }) {
    const [userInfo, { mutate }] = useCurrentUser();
    //const user = useUser(post.creatorId);
    //console.log('In comments what up');
    // const [isUpdating, setIsUpdating] = useState(false);
    var isUpdating = false;
    console.log('Check message');
    console.log(post);
    return (
        <div
            className="bg-white flex flex-col flex-1 p-6 shadow-md hover:shadow-xl
                  transition duration-200 ease-in-out rounded-md
                   w-full transform hover:scale-102
                  dark:bg-gray-900 dark:hover:bg-gray-800"
        >
            {(
                // <Link href={`/user/${user._id}`}>
                //     <div className="flex flex-col justify-between h-full">
                //         <span>{post.user._id}</span>
                //         <span>{post.comments[ind]}</span>
                //     </div>
                // </Link>
                <div className="flex flex-col justify-between h-full">
                    {/* <span>{post.user._id}</span> */}
                    <span>{post.message}</span>
                </div>
            )}
        </div>
    );
}

// function displayComments(post, ind) {
//     return (
//         <Comment key={post._id} post={post} ind={ind} />
//     )
// }

// function postComments(post) {
//     console.log(post);
//     for (var i = 0; i < post.comments.length; i++) {
//         displayComments(post, i);
//     }
// }

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

            // using oldest posts createdAt date as cursor
            // We want to fetch posts which has a datethat is
            // before (hence the .getTime() - 1) the last post's createdAt
            const from = new Date(
                new Date(
                    previousPageData.posts[previousPageData.posts.length - 1].createdAt
                ).getTime() - 1
            ).toJSON();

            return `/api/posts/patch?id=${postId}`;
        },
        fetcher,
        {
            refreshInterval: 3000, // Refresh every 3 seconds
        }
    );
}

export default function Comments({ postId }) {
    const { data, error, size, setSize } = usePostPages({ postId });

    const posts = data
        ? data.reduce((acc, val) => [...acc, ...val.posts], [])
        : [];

    console.log(posts);
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         //Function call
    //     }, 3000);
    //     return () => clearInterval(id);
    // })

    return (
        <div>
            <div className="w-full max-w-screen-2xl mx-auto grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {posts.map((post) => (
                    <Comment key={post._id} post={post} />
                    // postComments(post)
                ))}
                {/* <Comments key={post._id} post={post} /> */}
            </div>
        </div>
    );
}
