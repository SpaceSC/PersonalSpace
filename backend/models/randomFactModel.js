const mongoose = require("mongoose");

// schema
// if there is required or unique then use { type: Srting etc}
const randomFactSchema = new mongoose.Schema({
  fact: { type: String, required: true },
  source: String,
});

module.exports = mongoose.model("RandomFact", randomFactSchema);
