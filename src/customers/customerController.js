const { request, response } = require('express')
var responseService=require('../../services/responseService')

var customerService=require('./customerService')

module.exports.customerGetAll= async(request,response)=>{
try {
    var customers=await customerService.getAllCustomers()
    responseService.successWithData(response,customers)
} catch (error) {
    responseService.errorWithMessage(response,"Get All Customers Fail !")
}
}




module.exports.customerRegister=async(request,response)=>{
    try {
        var customer=await customerService.registerCustomer(request.body)
        responseService.successWithData(response,customer)
    } catch (error) {
       responseService.errorWithMessage(response,"Customer Register Fail !") 
    }
}

module.exports.customerLogin=async(request,response)=>{
    try {
        var customerData=await customerService.loginCustomer(request.body)
        if (customerData.status) {
        responseService.successWithMessage(response,customerData.message)
            
        } else {
        responseService.errorWithMessage(response,customerData.message)
            
        }
    } catch (error) {
       responseService.errorWithMessage(response,"Customer Login Fail !") 
        
    }
}

module.exports.customerUpdate=async(request,response)=>{
    try {
        var customer=await customerService.updatedCustomer(request.body,request.params.id)
        responseService.successWithMessage(response,"Customer Updated")
    } catch (error) {
       responseService.errorWithMessage(response,"Customer Update Fail !") 
    }
}

module.exports.customerRemove=async(request,response)=>{
    try {
        var customer=await customerService.removeCustomer(request.params.id)
        responseService.successWithMessage(response,"Customer Removed")
    } catch (error) {
      responseService.errorWithMessage(response,"Customer Remove Fail !")  
    }
}

module.exports.customer=async(request,response)=>{
    try {
        var customer=await customerService.singleCustomer(request.params.id)
       if (customer) {
        responseService.successWithData(response,customer)
        
       } else {
      responseService.errorWithMessage(response,"Customer Can not Find !")  
        
       }
       
    } catch (error) {
      responseService.errorWithMessage(response,"Customer Get Fail !")  
    }
}