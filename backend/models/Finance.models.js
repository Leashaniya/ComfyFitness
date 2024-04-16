//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const financeSchema= new Schema({

    salaryID: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    
    lastUpdated: {
        type: Date,
        required: true
    },

    salary: {
        type: Number,
        required: true
    },

    frequency: {
        type: String,
        required: true
    },
   
    
});

//assigning to mongodb table
//Customer will the table name 
const Finance=mongoose.model("Finance",financeSchema);

//returning Customer schema
module.exports=Finance;