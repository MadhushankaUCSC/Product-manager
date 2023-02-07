const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var productsSchemas=new Schema({
    item_name:{
        type:String,
        required:true
    },
    brand_name:{
        type:String,
        required:false
    },
    item_code:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    bundle_cost:{
        type:Number,
        required:true
    },
    available_quantity:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('products',productsSchemas);