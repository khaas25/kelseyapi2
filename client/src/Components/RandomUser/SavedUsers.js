import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";

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
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    var endpoint = userEndpoint;
    axios.get(`http://localhost:8080/${endpoint}`).then((response) => {
      console.log(response);
      setSavedUser(response.data);
    });
  }, [userEndpoint, update]);
  //*====================CHANGING USER ROLE (107?)=================
  const [selectedRole, setSelectedRole] = useState("default");
  const userRoleRefs = useRef({});

  const editUser = (id, reset = false) => {
    // e.preventDefault();

    const payload = { userRole: reset ? "" : selectedRole };
    axios
      .patch(`http://localhost:8080/saveuser/${id}`, payload)
      .then(() => {
        console.log("success");
        forceUpdate();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //*====================Search Bar=================
  const searchRef = useRef();
  function searchUsers() {
    const value = searchRef.current.value;

    const filterData = savedUser.filter((user) => {
      const input =
        `${user.userNameFirst} ${user.userNameLast} ${user.userRole} ${user.userCell}`.toLowerCase();
      return input.includes(value.toLowerCase());
    });
    setSavedUser([...filterData]);
  }
  //*====================Search Bar=================

  //!======================================================

  return (
    <div>
      {/* <div className="btn-container">
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
      </div> */}
      {/*====================SELECT BAR==================================*/}
      <div className="selectRoleContainer">
        {" "}
        <p>Filter: </p>
        <select
          id="selectRole"
          onChange={(e) => {
            setUserEndpoint(e.target.value);
          }}
        >
          <option value="saveuser"> All </option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="colleague">Colleague</option>
        </select>
      </div>

      {/*====================SELECT BAR==================================*/}
      {/*====================SEARCH BAR==================================*/}
      <div className="search-container">
        {" "}
        <input
          type="text"
          id="search"
          ref={searchRef}
          placeholder="search users..."
          onChange={searchUsers}
        />
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
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                    }}
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
                    onClick={() => editUser(singleUser._id, true)}
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
