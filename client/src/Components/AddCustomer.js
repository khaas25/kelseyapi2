import React from "react";
import { Heading, Box, FormLabel, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function AddCustomer() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phonenumberRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const toast = useToast();
  const addCustomer = (e) => {
    e.preventDefault();
    const payload = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phonenumber: phonenumberRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
    };
    axios
      .post("http://localhost:8080/customers", payload)
      .then(() => {
        toast({
          title: "Customer Added.",
          description: "We've added this customer.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        toast({
          title: "Action Failed.",
          description: "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="main">
      <Heading textAlign={"center"} mt={5} mb={5}>
        New Customer
      </Heading>
      <Box
        w={"50%"}
        m={"auto"}
        p={10}
        borderRadius={10}
        border={"2px solid white"}
      >
        <form onSubmit={addCustomer}>
          <FormLabel>Customer Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            mb={4}
            ref={firstNameRef}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            mb={4}
            ref={lastNameRef}
          />

          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            mb={4}
            ref={emailRef}
          />
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            mb={4}
            ref={phonenumberRef}
          />

          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            placeholder="Address"
            mb={4}
            ref={addressRef}
          />

          <Button type="submit" backgroundColor="teal">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}
