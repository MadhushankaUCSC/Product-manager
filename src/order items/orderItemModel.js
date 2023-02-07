var mongoose=require('mongoose')

var Schema=mongoose.Schema

var orderItemSchema=new Schema({
    order_id:{
        type:String,
        required:true
    },
    item_name:{
        type:String,
        required:true
    },
    item_code:{
        type:String,
        required:true
    },
    item_quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('order_items',orderItemSchema);