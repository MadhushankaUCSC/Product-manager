var mongoose=require('mongoose')

var Schema=mongoose.Schema

var customerSchema=new Schema({
    customer_name:{
        type:String,
        required:true
    },
    customer_mobile:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('customers',customerSchema)