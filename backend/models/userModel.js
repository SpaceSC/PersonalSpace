const mongoose = require("mongoose");

// schema
// if there is required or unique then use { type: Srting etc}
const userSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: true,
    unique: true,
  },
  given_name: String,
  family_name: String,
  username: String,
  picture: String,
  email: String,
  // role: {
  //   type: String,
  //   default: "member",
  // },
  apis: {
    iss_current_location: {
      type: Boolean,
      default: false,
    },
    people_in_space: {
      type: Boolean,
      default: true,
    },
    space_x: {
      type: Boolean,
      default: false,
    },
    apod: {
      type: Boolean,
      default: false,
    },
    planet_data: {
      type: Boolean,
      default: false,
    },
    mars_photo: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
