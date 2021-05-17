import { useState, useEffect } from "react";
import Router from "next/router";
import cookie from "js-cookie";

const newPostForm = (callback, validate) => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    caption: "",
    image_url: "",
  });
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        caption: values.caption,
        image_url: values.image_url,
      }),
    });
    //   .then((r) => r.json())
    //   .then((data) => {
    //     if (errors) {
    //       setErrors(validate(values));
    //     } else if (data && data.error) {
    //       setSignupError(data.message);
    //     }
    //     // if (data && data.token) {
    //     //   //set cookie
    //     //   setIsSubmitting(true);
    //     //   cookie.set("token", data.token, { expires: 2 });
    //     //   Router.push("/");
    //     // }
    //   });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default newPostForm;
