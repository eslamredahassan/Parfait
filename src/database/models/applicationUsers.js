const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  ap_user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const applicationUsers = (module.exports = mongoose.model("User", userSchema));
