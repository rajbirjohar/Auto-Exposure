import React from "react";
import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";

const IndexPage = () => {
  const [user] = useCurrentUser();
  var intros = [
    "Strap in,",
    "Get ready to shift gears,",
    "Hop in the front,",
    "Let's ride,",
    "Floor it,",
    "Burn some rubber,",
    "Start your engine,",
    "Buckle up,",
    "All gas no brakes,",
  ];
  let myintros = intros[Math.floor(Math.random() * intros.length)];

  return (
    <section className="mx-auto w-full max-w-screen-2xl">
      <h1 className="font-bold text-3xl tracking-loose">
        {myintros} {user ? user.firstname : "Racer"}.
      </h1>
      <div>
        <h2 className="font-medium text-xl text-gray-400 my-4 dark:text-gray-500">
          Here is your current feed. Enjoy the drive.{" "}
          {user ? "" : "Sign in to post."}
        </h2>
        <div className="flex flex-col">
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
