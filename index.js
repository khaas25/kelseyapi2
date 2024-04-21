var express = require("express");
var cors = require("cors");
var app = express();
var PORT = 8080;
app.use(express.json({ limit: "10mb" }));
app.use(cors());
const Product = require("./Models/Products");
const Customer = require("./Models/Customers");

// ===================================================================
app.post("/products", async (req, res) => {
  try {
    const addProduct = await Product.create(req.body);
    res.status(200).send(addProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});
// =================================================================
app.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});
// ===================================================================

// ===================================================================
app.post("/customers", async (req, res) => {
  try {
    const addCustomer = await Customer.create(req.body);
    res.status(200).send(addCustomer);
  } catch (error) {
    // res.status(500).send(error);
     res.status(500).send({ error: error.message || error.stack });
  }
});
// =================================================================
app.get("/customers", async (req, res) => {
  try {
    const allCustomers = await Customer.findAll();
    res.status(200).send(allCustomers);
  } catch (error) {
    res.status(500).send(error);
  }
});
// ===================================================================

app.listen(PORT, () => {
  console.log("API is running on port: " + PORT);
});
