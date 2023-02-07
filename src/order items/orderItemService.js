var orderItemModel=require('./orderItemModel')

module.exports.getAllOrderItems=()=>{
    return new Promise((resolve,reject)=>{
        orderItemModel.find({},(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}


module.exports.getOrderItemsByOrderId=(id)=>{
    return new Promise((resolve,reject)=>{
        orderItemModel.find({order_id:id},(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}

module.exports.addNewOderItems=(order_id,item_name,item_code,item_quantity,total_product_price)=>{
   
    return new Promise((resolve,reject)=>{
        orderItemModel.insertMany({
            order_id:order_id,

            item_name:item_name,

            item_code:item_code,

            item_quantity:item_quantity,

            price:total_product_price
        },(error,data)=>{
            if (error) {
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}


module.exports.removeOrderItems=(order_id)=>{
    return new Promise((resolve,reject)=>{
        orderItemModel.deleteMany({order_id:order_id},(error)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        });
    });
}