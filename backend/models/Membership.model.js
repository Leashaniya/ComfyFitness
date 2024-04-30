const mongoose=require("mongoose");
const Schema =mongoose.Schema;
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
    Id: {
        type: String,
        required: true,
      },
}
);
//assigning to mongodb table
//Membership will the table name 
const Membership=mongoose.model("Membership",membershipSchema);
//returning Subscription schema
module.exports=Membership;