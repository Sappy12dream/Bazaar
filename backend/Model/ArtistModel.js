const mongoose = require('mongoose')
require('dotenv').config({path:'./backend/config/.env'});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')
const crypto = require('crypto')



const artistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter name'],
        maxlength:[50,'Name cannot exceed 80 character'],
        minlength:[4, 'Name should have atleat 4 character' ]
    },
    email:{
        type:String,
        required:[true, 'Please enter name'],
        unique:true,
        validate: [validator.isEmail,'Please enter a valid email'],
    },
    password:{
        type:String,
        required:[true, 'Please enter name'],
        validate: [validator.isStrongPassword, 'Password must contain { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}'],
        select:false
    },
    bio:{
        type:String,
        required:[true, 'Please enter name'],
        maxlength:[200,'Name cannot exceed 200 character'],
        minlength:[4, 'Name should have atleat 4 character' ]
    },
    avatar:
        {
        pid:{
            type:String,
            required:[true,'PID required']
        },
        url:{
            type:String,
            required:[true,'url']
        }
    },
    whatsappLink:{
        type:String,
        required:[true, "Whatsapp link is required"],
        validate: [validator.isURL, "Please enter a  valid whatsapp link"]
    },
    role:{
        type:String,
        default:'artist'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

artistSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
    
})

artistSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
    
}

artistSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

artistSchema.methods.getResetpassToken = function (){

    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex")

    this.resetPasswordExpire =  Date.now()+15*60*1000

    return resetToken

}
module.exports = mongoose.model('artist', artistSchema)
