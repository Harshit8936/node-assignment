const mongoose = require('mongoose');

const amountSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    amount:{type:Number},
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Amount',amountSchema);