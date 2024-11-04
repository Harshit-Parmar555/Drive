import React, { useState } from "react";
import "./Document.css";
import axios from "axios";

const Document = (props) => {
  const [loading, setloading] = useState(false);
  const handledelte = async () => {
    setloading(true);
    const response = await axios.delete(
      `http://localhost:8080/api/v1/document/deletedocument/${props.id}`,
      { withCredentials: true }
    );
    if (response.data.success === true) {
      setloading(false);
      alert("Document deleted sucessfully");
      location.reload();
    } else {
      alert("Error in removing document");
    }
  };
  return (
    <div className="Document-Container">
      <div className="Document-Container-View">
        <h1>{props.name}</h1>
      </div>
      <div className="Document-Container-Option">
        <a href={props.link}>Download</a>
        {loading ? (
          <button disabled>wait...</button>
        ) : (
          <button onClick={handledelte}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default Document;
