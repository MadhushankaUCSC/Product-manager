var customerModel=require('./customerModel')

module.exports.getAllCustomers=()=>{
    return new Promise((resolve,reject)=>{
        customerModel.find({},(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}


module.exports.registerCustomer=(customerData)=>{
    return new Promise((resolve,reject)=>{
        customerModel.insertMany(
            {customer_name:customerData.customer_name,
            customer_mobile:customerData.customer_mobile,
            password:customerData.password
        
        },(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}

module.exports.updatedCustomer=(cusData,id)=>{
    return new Promise((resolve,reject)=>{
        customerModel.updateOne({_id:id},
            {$set:{customer_name:cusData.customer_name,
            customer_mobile:cusData.customer_mobile,
            password:cusData.password
        
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

module.exports.removeCustomer=(id)=>{
    return new Promise((resolve,reject)=>{
        customerModel.deleteOne({_id:id},(error)=>{
            if (error) {
                reject(error)
            }else{
                resolve()
            }
        });
    });
}



module.exports.singleCustomer=(id)=>{
    return new Promise((resolve,reject)=>{
        customerModel.find({_id:id},(error,data)=>{
            if (error) {
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}