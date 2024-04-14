//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const membershipSchema= new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    membershipType: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    
});

//assigning to mongodb table
//Membership will the table name 
const Membership=mongoose.model("Membership",membershipSchema);

//returning Membership schema
module.exports=Membership;