import React from "react";
import "./Navbar2.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authactions } from "../Redux/redux";
import { useNavigate } from "react-router-dom";
const Navbar2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout=()=>{
    dispatch(authactions.logout());
    navigate("/login");
  }
  return (
    <>
      <nav className="Navbar-2">
        <div className="Navbar-2-Logo">
          <h1>Drive</h1>
        </div>
        <div className="Navbar-2-Option">
          <button onClick={handlelogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
