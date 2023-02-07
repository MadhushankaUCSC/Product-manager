// const { request, response } = require('express');
var express = require("express"); //import express
var mongoose = require("mongoose"); //import mongoose
var routes=require('./routes/routes')
var server = express(); //create server using express

server.use(express.json()); //accept json format request only

mongoose.set("strictQuery", true);


/**  create connection with mongo db
 * connection string - mongodb://localhost:27017/products_manager
 */
mongoose.connect("mongodb://localhost:27017/Products_manager", (error) => {
  if (error) {
    console.log("connection fail", error);
  } else {
    console.log("connected to db!");
  }
});




// server.get("/product/all");

// server.post("/product/create", (request, response) => {
//   var productsModelData = new productsModel();

//   productsModelData.item_name = request.body.item_name;

//   productsModelData.brand_name = request.body.brand_name;

//   productsModelData.item_code = request.body.item_code;

//   productsModelData.quantity = request.body.quantity;

//   productsModelData.bundle_cost = request.body.bundle_cost;

//   productsModelData.save((err, data) => {
//     if (err) {
//       response.send({
//         //used send function build in express to send response to client
//         status: false,
//         data: err,
//       });
//     } else {
//       response.send({
//         //used send function build in express to send response to client
//         status: true,
//         data: data,
//       });
//     }
//   });
// });


server.use(routes)

server.listen(3000, (error) => {
  if (error) {
    console.log("something went wrong");
  } else {
    console.log("server connected!");
  }
});
