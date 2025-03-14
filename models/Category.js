const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Category name must be unique
});

module.exports = mongoose.model("Category", categorySchema);
