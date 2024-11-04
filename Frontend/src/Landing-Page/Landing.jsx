import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="Landing-Page-Container">
        <div className="Landing-Page-Container-Headline">
          <h1>Store Your Notes Safely</h1>
        </div>
        <div className="Landing-Page-Container-Button">
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Start !!!
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
