const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    transferamount:{type:Number},
    toAccount:{type:Number},
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Payment',paymentSchema);