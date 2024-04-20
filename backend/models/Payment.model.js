//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const paymentSchema= new Schema({

    //2
    paymentAmount: {
        type: Number,
        required: [true, "Please add a payment amount"],
        min: [1, "Payment amount cannot be negative"],
    },
    //3
    paymentDate: {
        type: Date,
        required: [true, "Please add a payment date"],
        validate: {
            validator: function(value) {
                // Check if payment date is in the past
                return value >= new Date();
            },
            message: "Payment date must be in future",
        },
    },
    //4
    pDescription: {
        type: String,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    //5
    pAddressl: {
        type: String,
        required: [true, "Please add a payment address"],
    },

    pCountry: {
        type: String,
        required: [true, "Please add a payment country"],
    },
    Id: {
        type: String,
        required: true,
      },
},

);

//assigning to mongodb table
//Customer will the table name 
const Payment=mongoose.model("Payment",paymentSchema);

//returning Customer schema
module.exports=Payment;