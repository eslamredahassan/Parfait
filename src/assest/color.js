const chalk = require("chalk");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  ///---| Main UI Banners |---///
  gray: `#2b2d31`,
  pink: `DARK_VIVID_PINK`,
  //--------------------------------------//,
};
console.log(
  chalk.reset(),
  chalk.red(` 〢`),
  chalk.yellow(` ${moment(Date.now()).format("LT")}`),
  chalk.red(` Colors File`),
  chalk.green.bold(` LOADED`),
);
