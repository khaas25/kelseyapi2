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

  return (
    <div>
      <>
        {users.map((user, index) => (
          <div>
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
          </div>
        ))}{" "}
        <br />
        <br />
        <button onClick={getRandomUser}>Generate User</button>
        <br />
        <br />
        <button>Save User</button>
      </>
    </div>
  );
}
