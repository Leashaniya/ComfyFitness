const mongoose=require("mongoose");

const Schema =mongoose.Schema;

const medicalReportSchema = new Schema({
    user: { 
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    file: {
        type: String
    }
})