const { codeBlock } = require("@discordjs/builders");
const settings = require("../config");
const moment = require("moment");

module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {
    console.log(" [Parfait antiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log(" [Parfait antiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
  });
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [Parfait antiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
  });
  process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [Parfait antiCrash] :: Multiple Resolves");
    console.log(type, promise, reason);
  });
  console.log(
    `\x1b[31m 〢`,
    `\x1b[30m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m Anti Crash`,
    `\x1b[32m LOADED`
  );
};
