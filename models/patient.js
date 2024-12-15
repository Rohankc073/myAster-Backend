const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
    phone: { type: String, required: true ,unique: true },
    fname : {type: String ,require:true},
    lname : { type :String , require : true},
    email : {type : String, require: true},
    dob : {type:String ,require: true},
    gender : {type:String ,require : true},
    address : {type:String,require:true},
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;