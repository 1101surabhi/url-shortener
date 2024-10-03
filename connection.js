const mongoose = require("mongoose")

const connectDB = async(url) => await mongoose.connect("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB connected!")) ;

module.exports = connectDB