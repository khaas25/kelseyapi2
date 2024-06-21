import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import "./SavedUsers.css";
export default function SavedUsers() {
  const [savedUser, setSavedUser] = useState([]);
  //   useEffect(() => {
  //     axios.get("http://localhost:8080/saveuser").then((response) => {
  //       console.log(response);
  //       setSavedUser(response.data);
  //     });
  //   }, []);

  //*======================ALL USERS=======================
  const [userEndpoint, setUserEndpoint] = useState("saveuser");

  useEffect(() => {
    var endpoint = userEndpoint;
    axios.get(`http://localhost:8080/${endpoint}`).then((response) => {
      console.log(response);
      setSavedUser(response.data);
    });
  }, [userEndpoint]);
  //*====================CHANGING USER ROLE (107?)=================

  const userRoleRefs = useRef({});

  const editUser = (id) => {
    // e.preventDefault();
    var userRole = userRoleRefs.current[id].value;

    const payload = { userRole: userRole };
    axios
      .patch(`http://localhost:8080/saveuser/${id}`, payload)
      .then(() => {
        console.log("success");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //!======================================================
  return (
    <div>
      <div className="btn-container">
        <center>
          <button
            className="role-btn"
            onClick={() => setUserEndpoint("saveuser")}
          >
            All
          </button>
          <button
            className="role-btn"
            onClick={() => setUserEndpoint("family")}
          >
            Family
          </button>
          <button
            className="role-btn"
            onClick={() => setUserEndpoint("friend")}
          >
            Friend{" "}
          </button>
          <button
            className="role-btn"
            onClick={() => setUserEndpoint("colleague")}
          >
            Colleague{" "}
          </button>
        </center>
      </div>
      {/*====================SEARCH BAR==================================*/}

      <div className="search-container">
        {" "}
        <input type="text" id="search" placeholder="search users..." />
      </div>
      {/*====================MAP THROUGH USERS===========================*/}

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

              {/*====================IF USERROLE IS EMPTY SHOW BELOW CODE==========*/}

              {singleUser.userRole === "" ? (
                <>
                  {" "}
                  <br />
                  <select
                    ref={(el) => (userRoleRefs.current[singleUser._id] = el)}
                  >
                    <option value="default"> --- Choose a Role --- </option>
                    <option value="family">Family</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                  </select>
                  <br />
                  <button onClick={() => editUser(singleUser._id)}>
                    Save Role
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <br />
                  <p>{singleUser.userRole}</p>
                  <button
                    value=""
                    onClick={() => editUser(singleUser._id)}
                    ref={(el) => (userRoleRefs.current[singleUser._id] = el)}
                  >
                    Edit Role
                  </button>
                </>
              )}
            </div>{" "}
          </>
        ))}
      </div>
    </div>
  );
}

//   function searchUsers() {
//     const value = searchRef.current.value;

//     const filterData = savedUser.filter((user) => {
//       return user.userNameLast.toLowerCase().includes(value.toLowerCase());
//     });
//     setSavedUser([...filterData]);
//   }
