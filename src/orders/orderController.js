var responseService = require("../../services/responseService");
var orderItemService = require("../order items/orderItemService");
var productService = require("../products/productService");

var orderService = require("./orderService");

/**
 * get all orders
 * @param {*} request 
 * @param {*} response 
 */
module.exports.orderGetAll = async (request, response) => {
  try {
    var orders = await orderService.getAllOrders();
    responseService.successWithData(response, orders);
  } catch (error) {
    responseService.errorWithMessage(response, "Get All Order Fail !");
  }
};


/**
 * create new order
 * @param {*} request 
 * @param {*} response 
 */
module.exports.orderCreate = async (request, response) => {
  try {
    var order = await orderService.createOrder(request.body.customer_id);

    for (let item_code in request.body.quantity) {
      var itemQuantity = request.body.quantity[item_code];

      var product = await productService.singleProduct(item_code);

      var unitCost = product[0].bundle_cost / product[0].quantity;

      var productPrice = unitCost + (unitCost * 5) / 100;

      var totalProductPrice = productPrice * itemQuantity;

      var orderItem = await orderItemService.addNewOderItems(
        order[0]._id.toString(),
        product[0].item_name,
        product[0].item_code,
        itemQuantity,
        totalProductPrice
      );

      var updatedProduct = {};
      updatedProduct.item_name = product[0].item_name;
      updatedProduct.brand_name = product[0].brand_name;
      updatedProduct.item_code = product[0].item_code;
      updatedProduct.quantity = product[0].quantity;
      updatedProduct.bundle_cost = product[0].bundle_cost;
      updatedProduct.available_quantity =
        product[0].available_quantity - itemQuantity;

      var product = await productService.updateProduct(
        updatedProduct,
        product[0]._id.toString()
      );
    }

    responseService.successWithData(response, order);
  } catch (error) {
    responseService.errorWithMessage(response, "Order Register Fail !");
  }
};

// module.exports.orderUpdate = async (request, response) => {
//   try {
//     var order = await orderService.updatedOrder(
//       request.body,
//       request.params.id
//     );

//     responseService.successWithMessage(response, "Order Updated");
//   } catch (error) {
//     responseService.errorWithMessage(response, "Order Update Fail !");
//   }
// };
 
/**
 * remove order with order items
 * @param {*} request 
 * @param {*} response 
 */
module.exports.orderRemove = async (request, response) => {
  try {
    var order = await orderService.removeOrder(request.params.id);

    var order_items = await orderItemService.getOrderItemsByOrderId(
      request.params.id
    );

    await orderItemService.removeOrderItems(request.params.id);

    order_items.forEach(async (element) => {
      var product = await productService.singleProduct(element.item_code);

      var newAvailableProductQuantity =
        product[0].available_quantity + element.item_quantity;

      await productService.updatedAvailableProductQuantity(
        element.item_code,
        newAvailableProductQuantity
      );
    });

    responseService.successWithMessage(response, "Order Removed");
  } catch (error) {
    responseService.errorWithMessage(response, "Order Remove Fail !");
  }
};


/**
 * get single order
 * @param {*} request 
 * @param {*} response 
 */
module.exports.order = async (request, response) => {
  try {
    var order = await orderService.singleOrder(request.params.id);
    responseService.successWithData(response, order);
  } catch (error) {
    responseService.errorWithMessage(response, "Order Get Fail !");
  }
};
