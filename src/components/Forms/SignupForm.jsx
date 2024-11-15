import React from "react";
import { Label } from "../../components/ui/label.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { postData } from "../../services/api.js";
import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const bodyData = {
      username: data.username,
      password: data.password,
    };
    await postData("/api/auth/register", bodyData)
      .then((data) => {
        // console.log(data.token);
        console.log(data);
        toast.success("signup successfully");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("id", data._id);
        navigate("/Home");
      })
      .catch((error) => {
        console.log("error is: ", error);
        toast.error(error.message);
      });
  };

  return (
    <>
      <form className={styles.form_style} onSubmit={handleSubmit(onSubmit)}>
        <Label className="font-bold text-2xl">Signup</Label>
        <div className={styles.input_box}>
          <Label className={styles.label_style}>Username</Label>
          <Input
            type="text"
            className={styles.input_style}
            {...register("username")}
          />
        </div>
        <div className={styles.input_box}>
          <Label className={styles.label_style}>Password</Label>
          <Input
            type="password"
            className={styles.input_style}
            {...register("password")}
          />
        </div>
        <Button type="submit">Signup</Button>
      </form>
    </>
  );
};

export default LoginForm;
