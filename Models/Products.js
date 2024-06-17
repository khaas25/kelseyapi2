const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root@localhost/kelseyscript");
const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});
Product.sync({ force: false })
  .then(() => {
    console.log("Products Table Created");
  })
  .catch(() => {
    console.log("Table not created");
  });

module.exports = Product;
