import React , {useState} from "react";
import "./Login.css";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {authactions} from "../Redux/redux"
const Login = () => {
  const dispatch = useDispatch();
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
      setloading(true)
      const response = await axios.post(
        "/api/v1/user/userlogin",
        { email: data.email, password: data.password },
        { withCredentials: true }
      );
      if (response.data.success === true) {
        dispatch(authactions.login());
        setloading(false)
        alert(response.data.message);
        navigate("/main");
      } else {
        alert(response.data.message);
        setloading(false);
      }
    } catch (error) {
      console.log("Error in login Page", error);
      setloading(false);
    }
  };
  return (
    <>
      <div className="Login-Page-Container">
        <div className="Login-Page-Container-Form">
          <h2>LOGIN</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {loading?<button disabled>wait...</button>:<button type="submit">Submit</button>}
            
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
