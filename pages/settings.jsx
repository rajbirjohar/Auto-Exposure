import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/index";
import toast, { Toaster } from "react-hot-toast";

const ProfileSection = () => {
  const [user, { mutate }] = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const firstnameRef = useRef();
  const bioRef = useRef();
  const profilePictureRef = useRef();
  const [msg, setMsg] = useState({ message: "", isError: false });

  useEffect(() => {
    firstnameRef.current.value = user.firstname;
    bioRef.current.value = user.bio;
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();
    if (profilePictureRef.current.files[0]) {
      formData.append("profilePicture", profilePictureRef.current.files[0]);
    }
    formData.append("firstname", firstnameRef.current.value);
    formData.append("bio", bioRef.current.value);
    const res = await fetch("/api/user", {
      method: "PATCH",
      body: formData,
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      // setMsg({ message: "Your profile has been updated." });
      toast.success("Profile Updated!");
    } else {
      // setMsg({ message: await res.text(), isError: true });
      toast.error("Profile failed to update!");
    }
    setIsUpdating(false);
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    const body = {
      oldPassword: e.currentTarget.oldPassword.value,
      newPassword: e.currentTarget.newPassword.value,
    };
    e.currentTarget.oldPassword.value = "";
    e.currentTarget.newPassword.value = "";

    const res = await fetch("/api/user/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      // setMsg({ message: "Password updated" });
      toast.success("Password Updated!");
    } else {
      // setMsg({ message: await res.text(), isError: true });
      toast.error("Password failed to update!");
    }
  };

  async function sendVerificationEmail() {
    const res = await fetch("/api/user/email/verify", {
      method: "POST",
    });
    if (res.status === 200) {
      // setMsg({ message: "An email has been sent to your mailbox." });
      toast.success("Check your inbox!");
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
      <Head>
        <title>Auto Exposure | Settings</title>
      </Head>
      <section className="mx-auto w-full max-w-xl">
        <Toaster />
        <h1 className="font-bold text-3xl tracking-loose mb-4">Edit Profile</h1>
        {msg.message ? (
          <p className="text-red-500 my-4">{msg.message}</p>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-2">
          {!user.emailVerified ? (
            <p>
              Your email has not been verified. <br />{" "}
              {/* eslint-disable-next-line */}
              <a
                role="button"
                className="text-blue-600 underline"
                onClick={sendVerificationEmail}
              >
                Send verification email
              </a>
            </p>
          ) : null}
          <h3 className="text-xl font-medium my-4">Profile Infomation</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 dark:text-gray-300">
                First Name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder=""
                ref={firstnameRef}
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                           dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 dark:text-gray-300">
                Biography
              </label>
              <textarea
                id="bio"
                name="bio"
                type="text"
                placeholder=""
                ref={bioRef}
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                           dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 dark:text-gray-300">
                Avatar
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="Upload your own profile picture"
                ref={profilePictureRef}
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-red-400"
              />
            </div>
            <button
              disabled={isUpdating}
              type="submit"
              className="bg-black text-white rounded-sm py-2 px-3 font-medium border-2 border-gray-200 hover:bg-gray-800 hover:shadow-lg transition duration-200 ease-in-out
                         dark:bg-gray-900 dark:text-white dark:border-gray-900 dark:hover:border-gray-50"
            >
              Save Profile
            </button>
          </div>
        </form>
        <form
          onSubmit={handleSubmitPasswordChange}
          className="space-y-2 min-w-full max-w-sm mt-8"
        >
          <h3 className="text-xl font-medium my-4">Password Reset</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 dark:text-gray-300">
                Old password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldpassword"
                required
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full
                           dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 dark:text-gray-300">
                New password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newpassword"
                required
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full
                           dark:bg-black dark:ring-gray-600 dark:focus:ring-2 dark:focus:ring-red-400"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-200 text-black rounded-sm py-2 px-3 font-medium border-2 border-gray-200 hover:bg-gray-300 hover:border-gray-300 hover:shadow-lg transition duration-200 ease-in-out
                         dark:bg-gray-900 dark:text-white dark:border-gray-900 dark:hover:border-gray-50"
            >
              Change Password
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

const SettingPage = () => {
  const [user] = useCurrentUser();

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    );
  }
  return <ProfileSection />;
};

export default SettingPage;
