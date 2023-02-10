var jwt = require("jsonwebtoken");
var responseService = require("./responseService");
var config=require('../config/config')
module.exports.tokenGenerate = (data) => {
  try {
    var token = jwt.sign(
      {
        customer_email: data.customer_email,
        id: data._id.toString(),
      },
      config.jwtSecret,{expiresIn:config.jwtExpires}
    );
    return token;
  } catch (error) {
    return null;
  }
};

module.exports.tokenValidation = (request, response, next) => {
  try {
    // console.log("dd",request.headers)
    var tokenResult = splitToken(request);

    if (tokenResult) {
      jwt.verify(tokenResult, "secret",(error, decodeData) => {
        if (error) {
          responseService.errorWithMessage(response, "Invalid Token");
        } else {
          next();
        }
      });
    } else {
      responseService.errorWithMessage(response, "Invalid Token");
    }
  } catch (error) {
    return false;
  }
};

var splitToken = (request) => {
  var token = null;
  if (request.headers.authorization) {
    if (request.headers.authorization.split(" ")[1]) {
      token = request.headers.authorization.split(" ")[1];
    }
  }
  return token;
};
