import React from "react";
import { useEffect } from "react";

import { useState } from "react";
import axios from "axios";
export default function RandomUser() {
  const [users, setUsers] = useState([]);
  const getRandomUser = () => {
    axios.get(`https://randomuser.me/api`).then((response) => {
      console.log(response.data.results);
      setUsers(response.data.results);
    });
  };

  //!======================================================
  const addUser = (user) => {

    const payload = {
      userNameTitle: user.name.title,
      userNameFirst: user.name.first,
      userNameLast: user.name.last,
      userEmail: user.email,
      userPhone: user.phone,
      userCell: user.cell,
      userLocationCity: user.location.city,
      userLocationState: user.location.state,
      userLocationCountry: user.location.country,
      userImage: user.picture.large,
    };

    axios
      .post("http://localhost:8080/saveuser", payload)
      .then(() => {
        alert("User Saved Successfully");
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        alert("Error saving user");
      });
  };

  //!======================================================

  return (
    <div>
      <>
        {users.map((user, index) => (
          <div key={index}>
            <h1>
              {user.name.title} {user.name.first} {user.name.last}
            </h1>
            <img src={user.picture.large} alt="User Image" />
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Cell: {user.cell}</p>
            <p>
              Location: {user.location.city}, {user.location.state},{" "}
              {user.location.country}
            </p>
            <button onClick={() => addUser(user)}>Save User</button>
          </div>
        ))}{" "}
        <br />
        <br />
        <button onClick={getRandomUser}>Generate User</button>
        <br />
        <br />
      </>
    </div>
  );
}
