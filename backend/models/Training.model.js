//schemas are created in this file
const mongoose = require("mongoose");

//create schema object
const Schema = mongoose.Schema;

//create schema instance
const trainingSchema = new Schema({

    trainingID: {
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
    phone: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },


});

//assigning to mongodb table
//Customer will the table name 
const Training = mongoose.model("Training", trainingSchema);

//returning Customer schema
module.exports = Training;