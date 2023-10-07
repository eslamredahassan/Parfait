const { codeBlock } = require("@discordjs/builders");
const config = require("../config");
const moment = require("moment");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  if (guild) {
    await guild.commands.set([
      {
        name: "setup",
        description: `[Dev] Launch setup menu to choose between open, close and developer modes`,
        type: "CHAT_INPUT",
      },
      {
        name: "about",
        description: `[Dev] Learn more about Parfait bot`,
        type: "CHAT_INPUT",
      },
      {
        name: "report_bug",
        description: `[Dev] Report a bug to the developer`,
        type: "CHAT_INPUT",
      },
      {
        name: "contact_dev",
        description: `[Dev] Send a message to parfait developer`,
        type: "CHAT_INPUT",
      },
      {
        name: "status",
        description: `[Dev] Check Parfait Uptime`,
        type: "CHAT_INPUT",
      },
      {
        name: "ping",
        description: `[Dev] Check Parfait latency`,
        type: "CHAT_INPUT",
      },
    ]);
  }
  console.log(
    `\x1b[0m`,
    `\x1b[31m 〢`,
    `\x1b[33m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m Slash Commands`,
    `\x1b[32m LOADED`,
  );
  client.channels.cache
    .get(`${config.Dev_Log}`)
    .send(
      codeBlock(
        "ini",
        `〢 ${moment(Date.now()).format("LT")} [ Slash commands LOADED ]`,
      ),
    );
};
