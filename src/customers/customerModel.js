var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var Schema = mongoose.Schema;

var customerSchema = new Schema({
  customer_email: {
    type: String,
    required: true,
  },
  customer_mobile: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

customerSchema.methods.encryptPassword = async (password) => {
  var salt = await bcrypt.genSalt();
  var encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

customerSchema.methods.validatePassword = async (password,encPassword) => {
  var validPassword =await bcrypt.compare(password, encPassword);
  return validPassword;
};

module.exports = mongoose.model("customers", customerSchema);
