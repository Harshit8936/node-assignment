const express = require('express');
const app = express();
const port  = 7000;
const mongoConnect = require('./db');
const cookieParser = require('cookie-parser');

// Importing DB
mongoConnect();
app.use(cookieParser())


// use middleware to use req.body
// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// app.get('/',(req,res)=>{
//     res.send("Hello world !")
// })
//set template engine
app.set("view engine","ejs");

// importing Routes here
app.use('/api/user',require('./routes/auth'));
app.use('/api/user/payment',require('./routes/payment'));



// server listeninig 
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})
