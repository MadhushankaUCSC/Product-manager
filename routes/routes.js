var express = require("express"); //import express
var productController=require('../src/products/productController')
var customerController=require('../src/customers/customerController')
var orderController=require('../src/orders/orderController')

var productSchemaValidation=require('../src/products/productSchemaValidation')
var orderSchemaValidation=require('../src/orders/orderSchemaValidation')
var customerSchemaValidation=require('../src/customers/customerSchemaValidation')

var authService=require('../services/authService')
var router=express.Router();


router.route('/product/all').get(authService.tokenValidation,productController.productGetAll);
router.route('/product/create').post(productSchemaValidation.validateCreateProductBody,productController.productCreate);
router.route('/product/update').put(productSchemaValidation.validatedUpdatedProductBody,productController.productUpdate);
router.route('/product/remove/:id').delete(productController.productRemove);
router.route('/product/:id').get(productController.product);


router.route('/customer/all').get(customerController.customerGetAll)
router.route('/customer/create').post(customerSchemaValidation.validateCreateCustomerBody,customerController.customerRegister)
router.route('/customer/update/:id').put(authService.tokenValidation,customerSchemaValidation.validateUpdateCustomerBody,customerController.customerUpdate)
router.route('/customer/remove/:id').delete(authService.tokenValidation,customerController.customerRemove)
router.route('/customer/:id').get(customerController.customer)
router.route('/customer/login').post(customerController.customerLogin)


router.route('/order/all').get(orderController.orderGetAll)
router.route('/order/create').post(authService.tokenValidation,orderSchemaValidation.validateCreateOrderBody,orderController.orderCreate)
// router.route('/order/update/:id').put(orderController.orderUpdate)
router.route('/order/remove/:id').delete(authService.tokenValidation,orderController.orderRemove)
router.route('/order/:id').get(authService.tokenValidation,orderController.order)

module.exports=router