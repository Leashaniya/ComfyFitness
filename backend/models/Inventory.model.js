//schemas are created in this file
const mongoose=require("mongoose");

//create schema object
const Schema =mongoose.Schema;

//create schema instance
const inventorySchema= new Schema({

      itemID: {
        type: String,
        required: true,
      },
      itemName: {
        type: String,
        required: true,
      },
      itemType: {
        type: String,
        required: true,
      },
      issueDate: {
        type: Date,
        required: true,
      },
    
});

//assigning to mongodb table
//Customer will the table name 
const Inventory=mongoose.model("Inventory",inventorySchema);

//returning Customer schema
module.exports=Inventory;