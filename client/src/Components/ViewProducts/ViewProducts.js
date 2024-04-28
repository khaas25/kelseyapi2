import React, { useState, useEffect } from "react";
import "./ViewProducts.css";
import { Image } from "@chakra-ui/react";
import axios from "axios";
import CustomModal from "../Modal/Modal";
import { useDisclosure } from "@chakra-ui/react";

export default function ViewProducts() {
  var [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      var response = await fetch(`http://localhost:8080/products`);
      var data = await response.json();
      setProducts(data);
      console.log(data);
    }
    getData();
  }, []);

  //==================================================
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({});
  const openModal = async (id) => {
    const response = await axios.get("http://localhost:8080/products/" + id);
    console.log(response.data);
    setProduct(response.data);
    onOpen();
  };
  return (
    <div>
      <div className="products-container">
        {products.map((product) => (
          <div className="single-product" onClick={() => openModal(product.id)}>
            {" "}
            <h1>{product.productName}</h1>
            <Image src={product.image} alt="thumbnail" />
            <p id="description">{product.description}</p>
            <p id="price">{product.productPrice}</p>
          </div>
        ))}
      </div>
      <CustomModal
        onClose={onClose}
        onOpen={onOpen}
        product={product}
        isOpen={isOpen}
      />
    </div>
  );
}
