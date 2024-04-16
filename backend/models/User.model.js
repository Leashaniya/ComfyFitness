//schemas are created in this file
const mongoose = require("mongoose");

//create schema object
const Schema = mongoose.Schema;

//create schema instance
const userSchema = new Schema({

    userID: {
        type: String,
        required: true,
    },
    //   customerType: {
    //     type: String,
    //     required: true,
    //   },
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

});

//assigning to mongodb table
//Customer will the table name 
const User = mongoose.model("User", userSchema);

//returning Customer schema
module.exports = User;