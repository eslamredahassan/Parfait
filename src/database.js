const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const moment = require("moment");

module.exports = async () => {
  try {
    await mongoose.connect(config.database, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
      `\x1b[31m ERROR`,
    );
  }
};
