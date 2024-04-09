const express=require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

//creating app
const app=express();

//creating server
const PORT =process.env.PORT || 7505;

app.listen(PORT,() =>{
    console.log("server is up and running on port")
});

//create a database
const URL=process.env.MONGODB_URL;
mongoose.connect(URL,);

//connecting database
const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb connection success")
});

//json format
app.use(cors());
app.use(bodyParser.json());

//router path to customer route file
const userRouter=require("./routes/User.route.js");
app.use("/user",userRouter)
