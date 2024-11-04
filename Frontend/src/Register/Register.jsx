import React, { useState } from "react";
import "./Register.css";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setloading(true);
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/userregister",
        { username: data.username, email: data.email, password: data.password }
      );
      if (response.data.success === true) {
        setloading(false);
        alert(response.data.message);
        navigate("/login");
      } else {
        alert(response.data.message);
        setloading(false);
      }
    } catch (error) {
      console.log("Error in register page", error);
    }
  };
  return (
    <>
      <div className="Register-Page-Container">
        <div className="Register-Page-Container-Form">
          <h2>REGISTER</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Enter Username"
              type="text"
              {...register("username")}
            />
            <input
              placeholder="Enter Email"
              type="email"
              {...register("email")}
            />
            <input
              placeholder="Enter Password"
              type="text"
              {...register("password")}
            />
            {loading ? (
              <button disabled>wait...</button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
