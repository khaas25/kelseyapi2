import React from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  ModalBody,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
export default function CustomModal(props) {
  var navigate = useNavigate();

  const toast = useToast();
  const deleteUser = async (id) => {
    await axios
      .delete("http://localhost:8080/products/" + id)
      .then(() => {
        toast({
          title: "Product Deleted.",
          description: "We've removed this product.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        props.setDeleteSignal("deleted");
        props.onClose();
      })
      .catch((e) => {
        toast({
          title: "Product not deleted.",
          description: "An unexpected error occured.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(e);
      });
  };
  //   =================== Navigate===================
  function editProduct(id) {
    navigate("/editproduct", { state: { id: id } });
  }
  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.product.productName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Description: {props.product.description}</p>
            <p>Price: {props.product.productPrice}</p>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={() => editProduct(props.product.id)}
            >
              <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                <EditIcon />
                <Text>Edit</Text>
              </Flex>
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => deleteUser(props.product.id)}
            >
              <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                <DeleteIcon />
                <Text>Delete</Text>
              </Flex>
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>{" "}
    </div>
  );
}
