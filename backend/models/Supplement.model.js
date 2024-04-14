//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const supplementSchema= new Schema({

    supplementID: {
        type: String,
        required: true,
      },
    //   customerType: {
    //     type: String,
    //     required: true,
    //   },
    supplementName: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      expiryDate: {
        type: Date,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    
});

//assigning to mongodb table
//Customer will the table name 
const Supplement=mongoose.model("Supplement",supplementSchema);

//returning Customer schema
module.exports=Supplement;