const mongoose = require("mongoose");

// schema
// if there is required or unique then use { type: Srting etc}
const apodSchema = new mongoose.Schema({
  date: { type: String, unique: true },
  explanation: String,
  media_type: String,
  title: String,
  url: String,
});

module.exports = mongoose.model("Apod", apodSchema);
