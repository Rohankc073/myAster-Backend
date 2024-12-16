const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    name : {type : String ,required : true},
    email : {type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    specialization : { type : String,require: true},
    experience : { type : String,require:true},
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports =  Doctor;



