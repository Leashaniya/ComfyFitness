//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const userSchema= new Schema({

    userID: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required : true
      },
    
});

//assigning to mongodb table
//User will the table name 
const User=mongoose.model("User",userSchema);

//returning User schema
module.exports=User;