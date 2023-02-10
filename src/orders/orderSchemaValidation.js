const { request, response } = require("express");
var joi = require("joi");
var responseService = require("../../services/responseService");

var createOrderValidateSchema = joi.object().keys({
  customer_id: joi.string().required(),
  quantity: joi.object().required(),
});

module.exports.validateCreateOrderBody = (request, response, next) => {
  var result = createOrderValidateSchema.validate(request.body);
  if (result.error) {
    responseService.errorWithMessage(response, result.error.details[0].message);
  } else {
    next();
  }
};
