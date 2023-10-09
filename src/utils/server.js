const moment = require("moment");
const express = require("express");
const app = express();
const port = 3000;
//// Application Sun ///

module.exports = async () => {
  try {
    app.get("/", (req, res) => {
      res.send(
        `🟢 Parfait Online in IEgyGamerI server ${moment().format("LTS")}`,
      );
    });
    app.listen(port, () => {
      console.log(
        `\x1b[0m`,
        `\x1b[31m 〢`,
        `\x1b[33m ${moment(Date.now()).format("LT")}`,
        `\x1b[31m Express Server`,
        `\x1b[32m ONLINE`,
      );
    });
  } catch (error) {
    console.log(
      `\x1b[0m`,
      `\x1b[31m 〢`,
      `\x1b[33m ${moment(Date.now()).format("LT")}`,
      `\x1b[31m Express Server`,
      `\x1b[323m ERROR: ${error.message}`,
    );
  }
};
