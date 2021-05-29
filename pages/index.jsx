import React from "react";
import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <section className="mx-auto w-full max-w-screen-2xl">
      <h1 className="font-bold text-3xl tracking-loose">
        Strap in, {user ? user.firstname : "Racer"}.
      </h1>
      <div>
        <h2 className="font-medium text-xl text-gray-400 my-4 dark:text-gray-500">
          Here is your current feed. Enjoy the drive.{" "}
          {user ? "" : "Sign in to post."}
        </h2>
        <div className="flex md:flex-row flex-col">
          <PostEditor />
          <div>
            <Posts />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
