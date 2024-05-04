const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const subscriptionSchema= new Schema({
  packageName: {
    type: String,
    required: [true, "Please add a package name"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
    min: [1, "Price cannot be negative"],
  },
  duration: {
    type: Number,
    required: [true, "Please add a duration in days"],
    min: [1, "Duration must be at least 1 day"],
    max: [365, "Duration cannot exceed 365 days"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  category: {
    type: String,
    enum: ["Special","Normal"],
    required: [true, "Please add a type"],
    default: "Special",
  },
  // startDate: {
  //   type: Date,
  //   required: [true, "Please add a start date"],
  //   validate: {
  //     validator: function (value) {
  //       // Check if start date is in the future
  //       return value >= new Date();
  //     },
  //     message: "Start date must be in the future",
  //   },
  // },  
  // endDate: {
  //   type: Date,
  //   required: [true, "Please add an end date"],
  //   validate: {
  //     validator: function (value) {
  //       // Check if end date is after start date
  //       return value >= this.startDate;
  //     },
  //     message: "End date must be after start date",
  //   },
  // },
  Id: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,  // Enable automatic timestamping
  } 
);
//assigning to mongodb table
//Subscription will the table name 
const Subscription=mongoose.model("Subscription",subscriptionSchema);
//returning Subscription schema
module.exports=Subscription;