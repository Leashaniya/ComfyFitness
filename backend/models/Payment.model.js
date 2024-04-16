//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const paymentSchema= new Schema({

  //1
    paymentID: {
      type: String,
      require: true,
      unique: true
    },
    //2
    paymentAmount: {
        type: Number,
        require:true
    },
    //3
    paymentDate: {
        type: String,
        require:true
    },
    //4
    pDescription: {
        type: String,
    },
    //5
    pAddressl: {
        type: String,
        require:true
    },
    
    //6
    pCountry: {
        type: String,
        require:true
    }
    
});

//assigning to mongodb table
//Customer will the table name 
const Payment=mongoose.model("Payment",paymentSchema);

//returning Customer schema
module.exports=Payment;