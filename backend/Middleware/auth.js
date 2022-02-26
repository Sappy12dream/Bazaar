const ErrorHandler = require("../Utils/errorHandler");
const jwt = require('jsonwebtoken')
const Artist = require('../Model/ArtistModel');
const User = require('../Model/UserModel');
const AsyncErrorHandler = require("./AsyncErrorHandler");

exports.isAuth = AsyncErrorHandler (async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('please login to access resource', 401))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await Artist.findById(decodedData.id) || await User.findById(decodedData.id) ;
    next()

})

exports.authRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role: ${req.user.role}, don't have access this route`,403)

            )
        }
        next();

    }

}
