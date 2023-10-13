const config = require("../config");
const moment = require("moment");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  if (guild) {
    try {
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
        {
          name: "echo",
          description: `[Dev] Parfait will send your message`,
          options: [
            {
              name: "channel",
              description: "Choose channel you want to send your message in",
              type: 7, // CHANNEL
              required: true,
            },
            {
              name: "message",
              description: "Type your echo message",
              type: 3, // STRING
              required: true,
              min_length: 2,
              max_length: 1000,
            },
          ],
        },
        {
          name: "freeze",
          description: `[Dev] Freeze a member from applying to SUN`,
          options: [
            {
              name: "who",
              description: "Mention the member you want to freeze him",
              type: 6, // MEMBER
              required: true,
            },
            {
              name: "reason",
              description: "Type your freeze reason",
              type: 3, // STRING
              required: true,
              min_length: 2,
              max_length: 1000,
            },
          ],
        },
        {
          name: "unfreeze",
          description: `[Dev] Unfreeze will break the snow and allow the member to applying to SUN again`,
          options: [
            {
              name: "who",
              description: "Mention the member you want to break his snow",
              type: 6, // MEMBER
              required: true,
            },
            {
              name: "reason",
              description: "Type your unfreeze reason",
              type: 3, // STRING
              required: true,
              min_length: 2,
              max_length: 1000,
            },
          ],
        },
      ]);
      console.log(
        `\x1b[0m`,
        `\x1b[31m 〢`,
        `\x1b[33m ${moment(Date.now()).format("LT")}`,
        `\x1b[31m Slash Commands`,
        `\x1b[32m LOADED`,
      );
    } catch (error) {
      console.log(
        `\x1b[0m`,
        `\x1b[31m 〢`,
        `\x1b[33m ${moment(Date.now()).format("LT")}`,
        `\x1b[31m Slash Commands`,
        `\x1b[323m ERROR: ${error.message}`,
      );
    }
  }
};
