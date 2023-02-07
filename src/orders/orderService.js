var orderModel=require('./orderModel')

module.exports.getAllOrders=()=>{
    return new Promise((resolve,reject)=>{
        orderModel.find({},(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}


module.exports.createOrder=(customer_id)=>{
    return new Promise((resolve,reject)=>{
        orderModel.insertMany(
            {customer_id:customer_id
        },(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}

module.exports.updatedOrder=(orderData,id)=>{
    return new Promise((resolve,reject)=>{
        orderModel.updateOne({_id:id},
            {$set:{
                customer_id:orderData.customer_id
        }
    },(error)=>{
        if (error) {
            reject(error)
        }else{
            resolve()
        }
    });
    });
}

module.exports.removeOrder=(id)=>{
    return new Promise((resolve,reject)=>{
        orderModel.deleteOne({_id:id},(error)=>{
            if (error) {
                reject(error)
            }else{
                resolve()
            }
        });
    });
}



module.exports.singleOrder=(id)=>{
    return new Promise((resolve,reject)=>{
        orderModel.find({_id:id},(error,data)=>{
            if (error) {
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}