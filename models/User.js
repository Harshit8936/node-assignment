const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true,validate(value){
        if(!validator.isEmail(value)){
            throw new Error ("Please enter correct email");
        }
    }},
    password:{type:String,required:true,validate(value){
        if(!validator.isLength(value,[{min:8}])){
            throw new Error ("Password length must be 8");
        }
    }},
    createdAt:{type:Date,default:Date.now}
})

module.exports=  mongoose.model('User',userSchema);