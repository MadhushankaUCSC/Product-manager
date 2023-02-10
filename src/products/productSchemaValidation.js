const { request, response } = require("express");
var joi = require("joi");
var responseService = require("../../services/responseService");
var createProductValidateSchema = joi.object().keys({
  item_name: joi.string().required(),
  brand_name: joi.string().required(),
  item_code: joi.string().required(),
  quantity: joi.number().required(),
  bundle_cost: joi.number().required(),
});

var updatedProductValidateSchema=joi.object().keys({
    item_name: joi.string(),
    brand_name: joi.string(),
    item_code: joi.string(),
    quantity: joi.number(),
    bundle_cost: joi.number(),
})

/**
 * product request validation
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
module.exports.validateCreateProductBody = (request, response, next) => {
  var result = createProductValidateSchema.validate(request.body);
  if (result.error) {
    responseService.errorWithMessage(response, result.error.details[0].message);
  } else {
    next();
  }
};


module.exports.validatedUpdatedProductBody=(request,response,next)=>{
    var result = updatedProductValidateSchema.validate(request.body);
    if (result.error) {
      responseService.errorWithMessage(response, result.error.details[0].message);
    } else {
      next();
    }
}