var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  userNameTitle: { type: String, required: false },
  userNameFirst: { type: String, required: false },
  userNameLast: { type: String, required: false },
  userEmail: { type: String, required: false },
  userPhone: { type: String, required: false },
  userCell: { type: String, required: false },
  userLocationCity: { type: String, required: false },
  userLocationState: { type: String, required: false },
  userLocationCountry: { type: String, required: false },
  userRole: { type: String, required: false, default: "" },
  userImage: { type: String, required: false },
});
var userInfo = new mongoose.model("userInfo", userSchema);
module.exports = userInfo;
