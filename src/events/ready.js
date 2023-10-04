const { Client, ActivityType } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const config = require("../config");
const moment = require("moment");

//// Application Sun ///

module.exports = async (client, config) => {
  let membersCount = client.guilds.cache
    .map((guild) => guild.memberCount)
    .reduce((a, b) => a + b, 0);

  function uptimeString(seconds) {
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${days} Days and ${hours} Hours`;
  }

  const statusArray = [
    {
      type: 3, // WATCHING
      content: `Library World`,
      status: "idle",
    },
    {type: 0, // PLAYING
      type: 0, // PLAYING
      content: `SMASH LEGENDS`,
      status: "idle",
    },
    {
      type: 2, // LISTENING
      content: `with ${membersCount} Members`,
      status: "idle",
    },
    {
      type: 0, // PLAYING
      content: `for ${uptimeString(Math.floor(process.uptime()))}`,
      status: "idle",
    },
    //'PLAYING [0]', 'STREAMING [1]', 'LISTENING [2]', 'WATCHING [3]', 'CUSTOM [4]', 'COMPETING [5]'
  ];
  async function pickPresence() {
    const option = Math.floor(Math.random() * statusArray.length);
    try {
      await client.user.setPresence({
        activities: [
          {
            name: statusArray[option].content,
            type: statusArray[option].type,
            url: statusArray[option].url,
          },
        ],
        status: statusArray[option].status,
      });
    } catch (error) {
      console.error(error);
    }
  }
  setInterval(pickPresence, 30000);
  console.log(
    `\x1b[0m`,
    `\x1b[31m 〢`,
    `\x1b[33m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m Parfait Activity`,
    `\x1b[32m UPDATED`,
  );
  client.channels.cache
    .get(`${config.Dev_Log}`)
    .send(
      codeBlock(
        "ini",
        `〢 ${moment(Date.now()).format("LT")} [ Parfait Activity UPDATED ]`,
      ),
    );
};
