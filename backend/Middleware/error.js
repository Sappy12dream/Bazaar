const ErrorHandler = require('../Utils/errorHandler');

module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500,
    err.message = err.message || 'internal server error'
    //wrong id error
    if(err.name === "CastError"){
        const message = `Resource not found, invalid ${err.path}`
        err = new ErrorHandler(message,400)
    }


    //mongoose duplicate 

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400)
    }

    //jwt wrong 

    if(err.name === "JsonWebTokenError"){
        const message = `Json web Token is invalid, try again`
        err = new ErrorHandler(message,400)
    }
    //jwt expire  

     if(err.name === "TokenExpireError"){
        const message = `Json web Token is expire, try again`
        err = new ErrorHandler(message,400)
    }
    res.status(err.statusCode).json({
        Success: false,
        message: err.message
    })

}