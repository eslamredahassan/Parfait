const { MongoClient } = require("mongodb");
const moment = require("moment");
const config = require("../config");
const chalk = require("chalk");

module.exports = async () => {
  try {
    const client = await MongoClient.connect(config.database);
    const database = client.db("parfaitdatabase");
    console.log(
      `\x1b[0m`,
      `\x1b[31m 〢`,
      `\x1b[33m ${moment(Date.now()).format("LT")}`,
      `\x1b[31m Database`,
      `\x1b[32m CONNECTED`,
    );
  } catch (error) {
    console.log(
      `\x1b[0m`,
      `\x1b[31m 〢`,
      `\x1b[33m ${moment(Date.now()).format("LT")}`,
      `\x1b[31m Database`,
      `\x1b[323m ERROR: ${error.message}`,
    );
  }
  return;
};
