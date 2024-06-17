import { Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function ViewUsers() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    async function getData() {
      var response = await fetch(`http://dummyjson.com/users`);
      var data = await response.json();
      console.log(data);
      setUsers(data.users);
    }
    getData();
  }, []);

  //!! Pagenation =========================
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  let lastItemOfPage = page * itemsPerPage;
  let firstItemOfPage = lastItemOfPage - itemsPerPage;

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  //!! Pagenation end=================

  //!! search=========================
  function searchUsers() {
    const key = document.getElementById("searchKey").value;
    const filterData = users.filter((item) => {
      return item.firstName.toLowerCase().includes(key.toLowerCase());
    });

    setUsers([...filterData]); // ...  creating copy of filterData and storing in setUsers
  }

  return (
    <>
      <div>
        {" "}
        {users.slice(firstItemOfPage, lastItemOfPage)?.map((user) => {
          return <div>{user.firstName}</div>;
        })}
      </div>
      <div className="pagination">
        <button onClick={previousPage}>Previous</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={nextPage}>Next</button>
      </div>
      <Input
        type="text"
        placeholder="Search"
        id="searchKey"
        onChange={searchUsers}
        color="black"
      />
    </>
  );
}
