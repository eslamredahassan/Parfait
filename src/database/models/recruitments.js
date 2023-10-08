const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

async function run() {
  const recruitments = new mongoose.Schema({
    ap_user_id: String,
    username: String,
    user_code: String,
    user_age: String,
    user_ct: String,
    user_legends: String,
    user_why: String,
  });
  run();
  module.exports = mongoose.model("ap_user", recruitments);
}
