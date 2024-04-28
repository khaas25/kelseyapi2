import React from "react";
import { Heading, Box, FormLabel, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function EditProduct() {
  var location = useLocation();
  var id = location.state.id;
  const productNameRef = useRef();
  const productDescriptionRef = useRef();
  const productPriceRef = useRef();
  const toast = useToast();
  const [product, setProduct] = useState({});
  //   ========================================EDIT PRODUCT=========================================
  useEffect(() => {
    async function getData() {
      var response = await fetch(`http://localhost:8080/products/` + id);
      var data = await response.json();
      console.log(data);
      setProduct(data);
    }
    getData();
  }, [id]);
  //   ========================================EDIT PRODUCT=========================================
  const editProduct = (e) => {
    e.preventDefault();
    const payload = {
      productName: productNameRef.current.value,
      productPrice: parseInt(productPriceRef.current.value),
      description: productDescriptionRef.current.value,
      //   image: document.getElementById("image").value,
    };
    axios
      .patch("http://localhost:8080/products/" + id, payload)
      .then(() => {
        toast({
          title: "Product Updated.",
          description: "Your product has been updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        toast({
          title: "Update Failed.",
          description: "Something went wrong while updating the product.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  // =====================================================

  //   function readFile2(e) {
  //     let files = e.target.files;
  //     for (let i = 0; i < files.length; i++) {
  //       (function (file) {
  //         var reader = new FileReader(); // Initialize base64 reader
  //         reader.onload = () => {
  //           var img = document.createElement("img");
  //           img.src = reader.result;
  //           document.getElementById("imagecontainer").appendChild(img);
  //           document.getElementById("image").value = reader.result; // Link of image in base64 format is stored in input as a string.
  //           console.log(reader.result);
  //         };
  //         reader.readAsDataURL(file); // Convert file to base64 data URL
  //       })(files[i]);
  //     }
  //   }
  // ===================================================================
  return (
    <div className="main">
      <Heading textAlign={"center"} mt={5} mb={5}>
        Edit Product
      </Heading>
      <Box
        w={"50%"}
        m={"auto"}
        p={10}
        borderRadius={10}
        border={"2px solid white"}
      >
        <form onSubmit={editProduct}>
          <FormLabel>Product Name!</FormLabel>
          <Input
            type="text"
            name="productName"
            defaultValue={product.productName}
            mb={4}
            ref={productNameRef}
          />
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            defaultValue={product.description}
            mb={4}
            ref={productDescriptionRef}
          />
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            defaultValue={product.productPrice}
            mb={4}
            ref={productPriceRef}
          />
          {/* <FormLabel>Upload Image</FormLabel>
          <Input
            type="file"
            name="image"
            accept="image/*"
            mb={4}
            border="none"
            borderBottom="1px solid"
            // onChange={readFile2}
          />
          <div id="imagecontainer"></div>
          <input type="text" id="image" hidden /> */}
          <Button type="submit" backgroundColor="teal">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}
