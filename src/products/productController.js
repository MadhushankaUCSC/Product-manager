var productsModel = require("./productModel");
var productService = require("./productService");
var responseService = require("../../services/responseService");

module.exports.productGetAll = async (request, response) => {
  try {
    var productsData = await productService.getAllProducts();

    responseService.successWithData(response, productsData);
  } catch (error) {
    responseService.errorWithMessage(response, "Get All Products Fail !");
  }
};

module.exports.productCreate =async (request, response) => {
  try {
    var dataInsert =await productService.productInsert(request.body);

    responseService.successWithData(response, dataInsert);

  } catch (error) {
    responseService.errorWithMessage(response, "Product Insert Fail !");
  }
};

module.exports.productUpdate =async (request, response) => {
  try {
    var updatedProduct =await productService.updateProduct(
      request.body,
      request.query._id
    );

    responseService.successWithMessage(response, "Product Updated !");
  } catch (error) {
    responseService.errorWithMessage(response, "Product Updated Fail !");
  }
};

module.exports.productRemove =async (request, response) => {
  try {
    var removedProduct =await productService.removeProduct(request.params.id);
    responseService.successWithMessage(response, "Product Removed !");
  } catch (error) {
    responseService.errorWithMessage(response, "Product Removed Fail !");
  }
};

module.exports.product =async (request, response) => {
  try {
    var product =await productService.singleProduct(request.params.id);
    responseService.successWithData(response, product);
  } catch (error) {
    responseService.errorWithMessage(response, "Product Get Fail !");
  }
};
