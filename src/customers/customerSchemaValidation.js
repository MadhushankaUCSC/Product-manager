const { request, response } = require("express");
var joi = require("joi");
var responseService = require("../../services/responseService");
var createCustomerSchema = joi.object().keys({
  customer_email: joi.string().required(),
  customer_mobile: joi.string().required(),
  password: joi.string().required(),
});

var updateCustomerSchema = joi.object().keys({
  customer_email: joi.string(),
  customer_mobile: joi.string(),
  password: joi.string(),
});

module.exports.validateCreateCustomerBody = (request, response, next) => {
  var result = createCustomerSchema.validate(request.body);
  if (result.error) {
    responseService.errorWithMessage(
      response,
      result.error.details[0].message
    );
  } else {
    next();
  }
};

module.exports.validateUpdateCustomerBody = (request, response, next) => {
  var result = updateCustomerSchema.validate(request.body);
  if (result.error) {
    responseService.errorWithMessage(
      response,
      result.error.details[0].message
    );
  } else {
    next();
  } 
};
