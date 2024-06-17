const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:12345@localhost/kelseyscript");
const Customer = sequelize.define("Customer", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Customer.sync({ force: false })
  .then(() => {
    console.log("Customer's Table Created");
  })
  .catch(() => {
    console.log("Customer not created");
  });

module.exports = Customer;
