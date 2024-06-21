var express = require("express");
var cors = require("cors");
var app = express();
var PORT = 8080;
app.use(express.json({ limit: "10mb" }));
app.use(cors());
const Product = require("./Models/Products");
const Customer = require("./Models/Customers");
var userInfo = require("./Models/Users");

require("./DB/Conn");

// ===================================================================
app.post("/saveuser", async (req, res) => {
  try {
    const user = await userInfo.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ===================================================================
// app.get("/saveuser", async (req, res) => {
//   try {
//     const allUsers = await userInfo.findAll();
//     res.status(200).send(allUsers);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.get("/saveuser", async (req, res) => {
  try {
    const allUsers = await userInfo.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ===================================================================

app.patch("/saveuser/:id", async (req, res) => {
  try {
    var _id = req.params.id;

    // === new:true shows the updated value, not the old value====
    var updateUser = await userInfo.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(updateUser);
  } catch {
    res.status(404).send("No user found");
  }
});

// ===================================================================

app.post("/products", async (req, res) => {
  try {
    const addProduct = new Product(req.body);
    res.status(200).send(addProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});
// ===================================================================
app.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});
//! ==========Get requests for roles.==================================

app.get("/family", async (req, res) => {
  try {
    var familyRole = await userInfo.find({ userRole: "family" });
    res.status(200).send(familyRole);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/friend", async (req, res) => {
  try {
    var friendRole = await userInfo.find({
      userRole: "friend",
    });
    res.status(200).send(friendRole);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/colleague", async (req, res) => {
  try {
    var colleagueRole = await userInfo.find({
      userRole: "colleague",
    });
    res.status(200).send(colleagueRole);
  } catch (error) {
    res.status(400).send(error);
  }
});

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
app.get("/products/:id", async (req, res) => {
  try {
    var productId = req.params.id;
    var product = await Product.findByPk(productId);
    res.status(200).send(product);
    if (!product) {
      res.status(404).json("Data Not Found");
    }
  } catch {
    res.status(500).send(error);
  }
});
// ===================================================================
app.delete("/products/:id", async (req, res) => {
  try {
    var productId = req.params.id;
    var product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).send("No product found");
    }
    await product.destroy();
    res.status(200).send("Product was deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});
// ===================================================================

app.patch("/products/:id", async (req, res) => {
  try {
    var productId = req.params.id;
    var product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).send("No Product Found");
    }
    await product.update(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
// ===================================================================
// ===================================================================
// ===================================================================
// ===================================================================
// ===================================================================

app.listen(PORT, () => {
  console.log("API is running on port: " + PORT);
});
