import React, { useState } from "react";
import Layout from "../components/Layout";
import usePostForm from "../util/usePostForm";
import validate from "../util/validateInfo";
import Link from "next/link";

const NewPost = ({ submitForm }) => {
  const [newPostError, setNewPostError] = useState("");
  const { handleChange, handleSubmit, values, errors } = usePostForm(
    submitForm,
    validate
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-2 max-w-sm" noValidate>
          <h1 className="font-bold text-3xl tracking-loose">New Post</h1>
          <h2>Make a new post and share your cars!</h2>
          <div className="flex flex-col">
            <label className="font-medium">Name:</label>
            <input
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Username:</label>
            <input
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Caption: </label>
            <input
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
              type="text"
              name="caption"
              placeholder="Enter your caption"
              value={values.caption}
              onChange={handleChange}
            />
            {errors.caption && <p className="text-red-500">{errors.caption}</p>}
            {newPostError && <p className="text-red-500">{newPostError}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Image URL: </label>
            <input
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
              type="text"
              name="image_url"
              placeholder="Enter your image_url"
              value={values.image_url}
              onChange={handleChange}
            />
            {errors.image_url && (
              <p className="text-red-500">{errors.image_url}</p>
            )}
          </div>
          <div className="flex items-center md:flex-row flex-col space-y-3 md:space-y-0">
            <button
              className="bg-black rounded-sm py-1 px-3 text-white font-medium"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewPost;
