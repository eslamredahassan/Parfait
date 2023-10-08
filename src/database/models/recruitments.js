const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

async function run() {
  const reqString = {
    type: String,
    required: true,
  };
  const recruitments = new mongoose.Schema({
    ap_user_id: reqString,
    username: reqString,
    user_code: reqString,
    user_age: reqString,
    user_ct: reqString,
    user_legends: reqString,
    user_why: reqString,
  });
  run();
  module.exports = mongoose.model("ap_user", recruitments);
}
