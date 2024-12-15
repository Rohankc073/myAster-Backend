const mongoose = require("mongoose")

const connectDB =async () =>{
    try{
    await mongoose.connect("mongodb://localhost:27017/myAster_db")
    console.log("Database connection Successful")
}catch(e){
    console.log(e)
    }
};

module.exports = connectDB;