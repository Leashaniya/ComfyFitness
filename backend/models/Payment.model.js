//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const paymentSchema= new Schema({

     paymentID: {
        type: String,
        required: true,
      },
      Amount: {
        type: Number,
        required: true
    },
     Status: {
        type: String,
        required: true
    }
    
});

//assigning to mongodb table
//Customer will the table name 
const Payment=mongoose.model("Payment",paymentSchema);

//returning Customer schema
module.exports=Payment;