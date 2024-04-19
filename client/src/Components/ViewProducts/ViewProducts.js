import React, { useState, useEffect } from "react";
import "./ViewProducts.css";
import { Image } from "@chakra-ui/react";
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
  return (
    <div>
      <div className="products-container">
        <div className="single-product">
          {products.map((product) => (
            <div>
              {" "}
              <h1>{product.productName}</h1>
              <Image src={product.image} alt="thumbnail" />
              <p id="description">{product.description}</p>
              <p id="price">{product.productPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
