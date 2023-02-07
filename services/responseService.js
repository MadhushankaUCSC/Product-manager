
module.exports.successWithData=(response,data)=>{
    response.send({
        status:true,
        data:data
    })
}


module.exports.successWithMessage=(response,message)=>{
    response.send({
        status:true,
        message:message
    })
}

module.exports.errorWithMessage=(response,message)=>{
    response.send({
        status:false,
        message:message
    })
}