import React from "react";
import "./ViewCustomers.css";
import { useState, useEffect } from "react";

export default function ViewCustomers() {
  var [customers, setCustomers] = useState([]);
  useEffect(() => {
    async function getData() {
      var response = await fetch(`http://localhost:8080/customers`);
      var data = await response.json();
      setCustomers(data);
      console.log(data);
    }
    getData();
  }, []);
  return (
    <div>
      <div className="customers-container">
        <div className="single-customer">
          {customers.map((customer) => (
            <div>
              {" "}
              <h1>First Name: {customer.firstName}</h1>
              <h1>Last Name: {customer.lastName}</h1>
              <p>Email: {customer.email}</p>
              <p>Phone Number: {customer.phoneNumber}</p>
              <p>Address: {customer.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
