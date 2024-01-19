const jwt = require('jsonwebtoken');
const JWT_SECRET = "h@rsh!t";

const fetchUser = (req,res,next)=>{
    // get the user from jwt token and add id to the req object
    // console.log("2",req.cookies)
    // console.log("3",req.cookies.authorisation)
    const token = req.header('auth-token') || req.cookies.authorisation;
    // const token = req.headers["auth-token"];
    // console.log(token)
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token !"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(500).send({ error:error.message,message:"Internal server error" })
    }
}

module.exports = fetchUser;