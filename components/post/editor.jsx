import React, { useState, useEffect, useRef } from "react";
import { useCurrentUser } from "@/hooks/index";
import toast, { Toaster } from "react-hot-toast";

export default function PostEditor() {
  const [user] = useCurrentUser();
  const [msg, setMsg] = useState(null);
  const captionRef = useRef();
  const postPictureRef = useRef();

  if (!user) {
    return <div></div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // const formData = new FormData();
    // if (postPictureRef.current.files[0]) {
    //   formData.append("postPicture", postPictureRef.current.files[0]);
    // }
    // formData.append("caption", captionRef.current.value);
    const body = {
      caption: e.currentTarget.caption.value,
      postPicture: e.currentTarget.postPicture.value,
    };
    if (!e.currentTarget.caption.value) return;
    if (!e.currentTarget.postPicture.value) return;
    e.currentTarget.caption.value = "";
    e.currentTarget.postPicture.value = "";
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      // setMsg("Posted!");
      // setTimeout(() => setMsg(null), 5000);
      toast.success("Posted!");
    }
  }

  return (
    <section className="bg-gray-100 flex flex-col w-full md:max-w-md pr-0 md:pr-8 md:my-0 my-4 dark:bg-black">
      <Toaster />
      <p>{msg}</p>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="space-y-2 min-w-full max-w-sm"
      >
        {/* Need to hook this up to db */}
        <div className="flex flex-col">
          <label className="font-medium">Post Picture</label>
          <input
            type="text"
            id="postPicture"
            name="postPicture"
            placeholder="Upload your car URL"
            className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full
                       dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-red-400"
          />
        </div>
        <div className="flex flex-col pb-4">
          <label className="font-medium">Caption</label>
          <input
            className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                       dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-red-400"
            type="text"
            id="caption"
            name="caption"
            placeholder=""
          />
        </div>
        <button
          id="buttonid"
          type="submit"
          className="w-full bg-black rounded-sm py-2 px-6 text-white font-medium border-2 border-gray-50 hover:bg-gray-800 hover:shadow-md transition duration-200 ease-in-out
                     dark:bg-gray-900 dark:text-white dark:border-gray-900 dark:hover:border-gray-50"
        >
          Post
        </button>
      </form>
    </section>
  );
}
