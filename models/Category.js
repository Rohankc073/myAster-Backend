const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name : {type : String, required : true},
    is_active: {type : Boolean, default: true}
},{
    timestamps : true
});
const Category = mongoose.model('Category',categorySchema);

module.exports = Category;