import React from "react";
import { Heading, Box, FormLabel, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function AddProduct() {
  const productNameRef = useRef();
  const productDescriptionRef = useRef();
  const productPriceRef = useRef();
  const toast = useToast();
  const addProduct = (e) => {
    e.preventDefault();
    const payload = {
      productName: productNameRef.current.value,
      productPrice: parseInt(productPriceRef.current.value),
      description: productDescriptionRef.current.value,
      image: document.getElementById("image").value,
    };
    axios
      .post("http://localhost:8080/products", payload)
      .then(() => {
        toast({
          title: "Product Added.",
          description: "We've uploaded your product for you.",
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

  // =====================================================

  function readFile2(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader(); // Initialize base64 reader
        reader.onload = () => {
          // If the file is an image
          var img = document.createElement("img");
          img.src = reader.result;
          document.getElementById("imagecontainer").appendChild(img);
          document.getElementById("image").value = reader.result; // Link of image in base64 format is stored in input as a string.
          console.log(reader.result);
        };
        reader.readAsDataURL(file); // Convert file to base64 data URL
      })(files[i]);
    }
  }
  // ===================================================================
  return (
    <div className="main">
      <Heading textAlign={"center"} mt={5} mb={5}>
        Add Product
      </Heading>
      <Box
        w={"50%"}
        m={"auto"}
        p={10}
        borderRadius={10}
        border={"2px solid white"}
        
      >
        <form onSubmit={addProduct}>
          <FormLabel>Product Name!</FormLabel>
          <Input
            type="text"
            name="productName"
            placeholder="Product Name"
            mb={4}
            ref={productNameRef}
          />
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            placeholder="Description"
            mb={4}
            ref={productDescriptionRef}
          />
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            placeholder="Price"
            mb={4}
            ref={productPriceRef}
          />
          <FormLabel>Upload Image</FormLabel>
          <Input
            type="file"
            name="image"
            accept="image/*"
            mb={4}
            border="none"
            borderBottom="1px solid"
            onChange={readFile2}
          />
          <div id="imagecontainer"></div>
          <input type="text" id="image" hidden />
          <Button type="submit" backgroundColor="teal">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}
