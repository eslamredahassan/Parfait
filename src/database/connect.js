const { MongoClient } = require("mongodb");
const moment = require("moment");
const config = require("../config");
const chalk = require("chalk");

module.exports = async () => {
  try {
    await MongoClient.connect(config.database);
    console.log(
      chalk.reset(),
      chalk.red(` 〢`),
      chalk.yellow(` ${moment(Date.now()).format("LT")}`),
      chalk.red(` Mongo Database`),
      chalk.green.bold(` CONNECTED`),
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
