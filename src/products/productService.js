var productsModel=require('./productModel')

module.exports.getAllProducts = () => {

  return new Promise((resolve, reject) => {

    var productsInDb = productsModel.find({}, (err, data) => {

      if (err) {
        reject(err);
      } else {
        resolve(data);
      }

    });
  });
};


module.exports.productInsert=(records)=>{

    return new Promise((resolve,reject)=>{

        productsModel.insertMany(
            {
            item_name:records.item_name,

            brand_name:records.brand_name,

            item_code:records.item_code,

            quantity:records.quantity,

            bundle_cost:records.bundle_cost,

            available_quantity:records.quantity,
        },(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}


module.exports.updateProduct=(records,id)=>{
    return new Promise((resolve,reject)=>{

        productsModel.updateOne({_id:id},{$set:{item_name:records.item_name,
            brand_name:records.brand_name,
            item_code:records.item_code,
            quantity:records.quantity,
            bundle_cost:records.bundle_cost,
            available_quantity:records.available_quantity

        }},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        });
    });
}


module.exports.removeProduct=(id)=>{
return new Promise((resolve,reject)=>{
    productsModel.findByIdAndDelete({_id:id},(error)=>{
        if(error){
            reject(error)
        }else{
            resolve()
        }
    });
});
}

module.exports.singleProduct=(id)=>{
    return new Promise((resolve,reject)=>{
        productsModel.find({item_code:id},(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        });
    });
}


module.exports.updatedAvailableProductQuantity=(item_code,quantity)=>{
    return new Promise((resolve,reject)=>{
        productsModel.updateOne({item_code:item_code},{$set:{available_quantity:quantity}},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        });
    });
}