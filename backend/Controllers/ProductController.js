const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const Product = require("../Model/Product");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../Utils/errorHandler");

//get all products - user
exports.getAllProducts = AsyncErrorHandler(async(req,res)=>{
    const resultPerPage = 10
    const productCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find({}), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(201).json({nbHits: products.length,productCount, products});
    } )


//create product - Artist
exports.createProduct = AsyncErrorHandler(async(req,res,next)=>{
    req.body.artist = req.user.id
    req.body.artistName = req.user.name
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true, 
        product
    })
})

//Update product - Artist

exports.updateProduct = AsyncErrorHandler(async(req,res,next)=>{
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler('product not found', 404))
        }
        product = await Product.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).json(product);
})

//Delete product - Artist

exports.deleteProduct = AsyncErrorHandler(async(req,res,next)=>{ 
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler('product not found', 404))
        }
        await product.remove()
        res.status(201).json({
                success: true,
                msg: 'product deleted'
            });
    
})

// get single product - User
exports.getProduct = AsyncErrorHandler(async(req,res,next)=>{
      
        const product = await Product.findById(req.params.id)

        if(!product){
            return next(new ErrorHandler('product not found', 404))
        }
        else{
            res.status(201).json({
                success: true,
                product 
            });

        }
})

