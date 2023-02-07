var mongoose=require('mongoose')

var Schema=mongoose.Schema;

var orderSchema=new Schema({
    customer_id:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model('orders',orderSchema);