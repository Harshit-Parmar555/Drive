import React from "react";
import "./Main.css";
import Document from "../Document/Document";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState , useRef } from "react";
import { useEffect } from "react";
import {useDispatch} from "react-redux"
import {authactions} from "../Redux/redux"
const Main = () => {
  const dispatch = useDispatch();
  const [userfiles, setuserfiles] = useState([])
  const files = useRef([])
  const navigate = useNavigate();
  const fetch=async()=>{
  try {
    const response = await axios.get("/api/v1/document/documentbyid" , {withCredentials:true});
    if(response.data.success===false){
      useDispatch(authactions.logout());
      alert(response.data.message);
      return null
    }
    setuserfiles(response.data.files);
  } catch (error) {
    console.log("Error in fetching documents");
  }
  }
  useEffect(() => {
    fetch();
  }, []);
  
  return (
    <>
      <div className="Main-Page-Container">
        <div className="Main-Page-Container-Box">
          {userfiles.map((index)=><Document key={index._id} id={index._id} name={index.documentname} link={index.documentlink}/>)}
        </div>
        <div className="Upload-Button">
          <button
            onClick={() => {
              navigate("/addfile");
            }}
          >
            + Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
