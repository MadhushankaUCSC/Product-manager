var express = require("express"); //import express
var productController=require('../src/products/productController')
var customerController=require('../src/customers/customerController')
var orderController=require('../src/orders/orderController')

var router=express.Router();


router.route('/product/all').get(productController.productGetAll);
router.route('/product/create').post(productController.productCreate);
router.route('/product/update').put(productController.productUpdate);
router.route('/product/remove/:id').delete(productController.productRemove);
router.route('/product/:id').get(productController.product);


router.route('/customer/all').get(customerController.customerGetAll)
router.route('/customer/create').post(customerController.customerRegister)
router.route('/customer/update/:id').put(customerController.customerUpdate)
router.route('/customer/remove/:id').delete(customerController.customerRemove)
router.route('/customer/:id').get(customerController.customer)

router.route('/order/all').get(orderController.orderGetAll)
router.route('/order/create').post(orderController.orderCreate)
// router.route('/order/update/:id').put(orderController.orderUpdate)
router.route('/order/remove/:id').delete(orderController.orderRemove)
router.route('/order/:id').get(orderController.order)

module.exports=router