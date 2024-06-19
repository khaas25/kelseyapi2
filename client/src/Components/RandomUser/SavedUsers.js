import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./SavedUsers.css";
export default function SavedUsers() {
  const [savedUser, setSavedUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/saveuser").then((response) => {
      console.log(response);
      setSavedUser(response.data);
    });
  }, []);
  //!======================================================

  //!======================================================
  return (
    <div className="flexy">
      {savedUser.map((singleUser) => (
        <>
          <div className="container">
            <h1 style={{ fontWeight: "bold" }}>
              {singleUser.userNameTitle}. {singleUser.userNameFirst}{" "}
              {singleUser.userNameLast}
            </h1>
            <img
              src={singleUser.userImage}
              alt="User Image"
              style={{ margin: "10px auto 10px", border: "solid 2px grey" }}
            />
            <p>{singleUser.userEmail}</p>
            <p>{singleUser.userCell}</p>
          </div>{" "}
        </>
      ))}
    </div>
  );
}


//   function searchUsers() {
//     const value = document.getElementById("searchBar").value;

//     const filterData = savedUser.filter((user) => {
//       return user.userNameLast.toLowerCase().includes(value.toLowerCase());
//     });
//     setSavedUser([...filterData]);
//   }