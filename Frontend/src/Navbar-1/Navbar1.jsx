import React from "react";
import "./Navbar1.css";
import {useNavigate} from "react-router-dom"
const Navbar1 = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar-1">
        <div className="Navbar-1-Logo">
          <h1>Drive</h1>
        </div>
        <div className="Navbar-1-Options">
          <button onClick={()=>{
            navigate("/register")
          }}>Register</button>
          <button onClick={()=>{
            navigate("/login")
          }}>Login</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar1;
