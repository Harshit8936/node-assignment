const Payment = require('../models/Payment');
const Amount = require('../models/Amount');

// Initial Amount credited function
const creditAmount = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).send({ message: "Amount can not be empty !" })
        }
        const amountObj = new Amount({
            amount,user: req.user.id
        })
        const newAmount = await amountObj.save();
        res.status(200).send({ message: "Amount Credited !" })
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
}


// Payment transfer function
const transferAmount = (async(req,res)=>{
    try {
        const { transferamount,toAccount } = req.body;
        if (!transferamount && !toAccount) {
            return res.status(400).send("Amount and account no. can not be empty !")
        }
        const checkTransferAmount = await Amount.findOne({ user: req.user.id });
        if (checkTransferAmount.amount >= transferamount) {
            const newTransferAmountObj = new Payment({
                transferamount,toAccount,user: req.user.id
            })
            const transferAmount = await newTransferAmountObj.save();
            let updatedAmount = checkTransferAmount.amount - transferamount;
            let newupdatedAmount = await Amount.updateOne({user: req.user.id}, { $set: { amount:updatedAmount}});
            // res.status(200).send({ message: "Amount Transferred !",transferAmount:transferAmount })
            res.status(200).redirect('/api/user/payment/paymenthistory');
        }
        else{
            return res.status(400).send("You don't have sufficient balance")
        }
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
})



const getTranscationHistory = async(req,res)=>{
        try {
            const checkUser = await Amount.findOne({ user: req.user.id });
            if(!checkUser){
                return res.status(400).send("User not exist !")
            }
            const allPayments = await Payment.find({user: req.user.id});
            // res.status(200).send({ message: "Logged In user transaction history", data:allPayments })
            res.status(200).render("payment",{
                title:"Transaction Page",payments:allPayments,
            })
        } catch (error) {
            res.status(500).send({ error: error.message, message: "Internal server error" })
        }
}

// get payment history page
const getpaymentpage = async(req,res)=>{
    try{
        res.render("paymenttransfer",{
            title:"Transfer Page",payments:{},
        })
    }catch(err){
        res.json({status:400,message:err})
    }
}





module.exports = {creditAmount,transferAmount,getTranscationHistory,getpaymentpage}