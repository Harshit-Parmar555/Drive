import React from "react";
import "./Add.css";
import { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { authactions } from "../Redux/redux";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [loading, setloading] = useState(false);
  const [file, setfile] = useState("");
  const [filename, setfilename] = useState("");

  const handlesubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/api/v1/document/adddocument",
      { filename: filename, filepath: file.name },
      { withCredentials: true }
    );
    if (response.data.success === true) {
      alert("document added Successfully");
      setloading(false);
    } else {
      alert("Error in uploading document");
      dispatch(authactions.logout());
    }
  };
  const handleback=()=>{
       navigate("/main");
  }
  return (
    <>
      <div className="Add-Page-Container">
        <div className="Add-Page-Container-Form">
          <form onSubmit={handlesubmit} action="">
            <input
              type="text"
              placeholder="Enter file name"
              onChange={(e) => {
                setfilename(e.target.value);
              }}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              style={{ marginTop: "7%" }}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => setfile(e.target.files[0])}
                multiple
              />
            </Button>
            {loading ? (
              <button disabled>wait...</button>
            ) : (
              <button type="submit">Upload</button>
            )}
          </form>
          
        </div>
        <div className="Back-Btn">
          <button onClick={handleback}>Back</button>
        </div>
      </div>
    </>
  );
};

export default Add;
