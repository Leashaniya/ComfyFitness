const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const ticketSchema= new Schema({

    ticketID: {
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
      feedback: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    
});

//assigning to mongodb table
//User will the table name 
const Ticket=mongoose.model("Ticket", ticketSchema);

//returning User schema
module.exports=Ticket;