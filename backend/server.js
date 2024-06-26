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

//router path to user route file
const userRouter=require("./routes/User.route.js");
app.use("/user",userRouter)

//router path to membership route file
const membershipRouter=require("./routes/Membership.route.js");
app.use("/membership",membershipRouter)

//Krushanth
//router path to Inventry route file
const inventoryRouter=require("./routes/Inventory.route.js");
app.use("/inventory",inventoryRouter)

//router path to Supplement route file
const supplementRouter=require("./routes/Supplement.route.js");
app.use("/supplement",supplementRouter)


//Ajey



//Karthik



//Ashvika



//Harshika



//Hasmath
