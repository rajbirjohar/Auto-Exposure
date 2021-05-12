import { useState, useEffect } from "react";
import Router from "next/router";
import cookie from "js-cookie";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
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

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (errors) {
          setErrors(validate(values));
        }
        if (data && data.token) {
          //set cookie
          setIsSubmitting(true);
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/");
        }
      });
    // setErrors(validate(values));
    // setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
