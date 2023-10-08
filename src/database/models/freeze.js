const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

async function run() {
  const reqString = {
    type: String,
    required: true,
  };
  const freezeSchema = new mongoose.Schema({
    ap_user_id: String,
    username: String,
    staff_id: String,
    reason: String,
    expires: {
      type: Date,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
    },
    timestaps: true,
  });
  run();
  module.exports = mongoose.model("ap_freeze", freezeSchema);
}
