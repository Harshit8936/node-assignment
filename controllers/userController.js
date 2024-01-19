const User = require('../models/User');
const Amount = require('../models/Amount');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "h@rsh!t";



// create user function for sign up
createUser = async (req, res,next) => {
    try {
    let newUserObj = await User.findOne({email:req.body.email});
    if(newUserObj){
        return res.status(404).json({message: "Sorry ! email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt)
             newUserObj = new User({
                email: req.body.email,
                password: secPassword,
            })
            const newUser = await newUserObj.save();
            const data = {
                user:{
                    id:newUser._id
                }
            }
            const amountObj = new Amount({
                amount:10000,user: data.user.id
            })
            const newAmount = await amountObj.save();
            // jwt.sign means generate authtoken
            const authToken = jwt.sign(data,JWT_SECRET);
            // res.status(200).send({ message: "User Created !", status: 200,token:authToken })
            res.redirect("/api/user/loginuser");
        } catch (error) {
            console.error(error.message)
            res.status(500).send({ error:error.message,message:"Internal server error" })
        }
}


// Authenticate the user for user sign in

signInUser = async (req,res)=>{
    try {
     const{email,password} = req.body;
     if(!email || !password){
        return res.status(404).json({message: "Both email and password required" })
     }
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message: "Please try to login correct creds !" })
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(404).json({message: "Please try to login correct creds !" })
        }
        const data = {
            user:{
                id:user._id
            }
        }
        // jwt.sign means generate authtoken
        const authToken = jwt.sign(data,JWT_SECRET);
        // res.status(200).send({ message: "Login IN !", status: 200,token:authToken })
        // res.header('auth-token',authToken)
        // console.log(res);
        res.status(200).cookie('authorisation',authToken,{
            expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
          }).redirect(`/api/user/payment/paymenthistory`);
     } catch (error) {
            console.error(error.message)
            res.status(500).send({ error:error.message,message:"Internal server error" })
     }
     
}

loggedUser = async(req,res)=>{
try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).send({message: "User details !", status: 200,data:user})
} catch (error) {
    console.error(error.message)
    res.status(500).send({ error:error.message,message:"Internal server error" })
}
}

// Get logged in user details via auth token we need to send auth token 

// get home page
home = async(req,res)=>{
    try{
        res.render("home",{
            title:"Home page",
        })
    }catch(err){
        res.json({status:400,message:err})
    }
}

// get signUp page
signUp = async(req,res)=>{
    try{
        res.render("signup",{
            title:"Sign Up page",
        })
    }catch(err){
        res.json({status:400,message:err})
    }
}

// get signIn page
signIn = async(req,res)=>{
    try{
        res.render("signin",{
            title:"Sign In page",
        })
    }catch(err){
        res.json({status:400,message:err})
    }
}

module.exports = { createUser,signInUser,loggedUser,home,signUp,signIn }