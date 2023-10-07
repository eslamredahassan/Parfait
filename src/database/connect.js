const { MongoClient } = require("mongodb");
const moment = require("moment");
const db = process.env.db;

module.exports = async () => {
  try {
    await MongoClient.connect(db);
    console.log(
      `\x1b[0m`,
      `\x1b[31m 〢`,
      `\x1b[33m ${moment(Date.now()).format("LT")}`,
      `\x1b[31m Database`,
      `\x1b[32m CONNECTED`,
    );
  } catch (error) {
    console.error(
      `\x1b[0m`,
      `\x1b[31m 〢`,
      `\x1b[33m ${moment(Date.now()).format("LT")}`,
      `\x1b[31m Database`,
      `\x1b[31m ERROR: ${error.message}`,
    );
  }
};
