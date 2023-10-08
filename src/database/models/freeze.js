const mongoose = require("mongoose");

async function run() {
  const reqString = {
    type: String,
    required: true,
  };
  const freezeSchema = new mongoose.Schema({
    ap_user_id: reqString,
    username: reqString,
    staff_id: reqString,
    reason: reqString,
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
