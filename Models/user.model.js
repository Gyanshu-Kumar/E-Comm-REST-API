const mongoose = require("mongoose")


// name
// userId
// email
// password
// userType


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true
    },
    userType:{
        type:String,
        required:true,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }
},{timestamps:true, versionKey:false}) // This line will add createdAt and updatedAt fields automatically.

module.exports = mongoose.model("User", userSchema) // This line will create a collection named 'users' in the database with the above schema.
