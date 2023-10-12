const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

const fieldsText = require("../assest/fieldsText.js");
const banners = require("../assest/banners.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");
const moment = require("moment");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  let Logo = guild.iconURL({ dynamic: true });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "#answer_yes": {
          let langButtons = new MessageActionRow().addComponents([
            new MessageButton()
              .setStyle(2)
              .setDisabled(false)
              .setCustomId("#lang_en_eu")
              .setLabel("[EU] English")
              .setEmoji(emojis.aboutSun),
            new MessageButton()
              .setStyle(2)
              .setDisabled(true)
              .setCustomId("#requirements")
              .setLabel("[NA] English")
              .setEmoji(emojis.requirements),
            new MessageButton()
              .setStyle(2)
              .setDisabled(false)
              .setCustomId("#open")
              .setLabel("[EU] French")
              .setEmoji(emojis.on),
          ]);

          console.log(
            `\x1b[0m`,
            `\x1b[31m 〢`,
            `\x1b[33m ${moment(Date.now()).format("lll")}`,
            `\x1b[34m ${interaction.user.username} Answered`,
            `\x1b[35m Yes for Requirements`,
          );

          return await interaction.update({
            embeds: [
              new MessageEmbed()
                .setColor(color.gray)
                .setTitle(`${emojis.step} Language and region`)
                .setDescription(
                  `### ${emojis.check} **Choose your language and your region**`,
                )
                //.setThumbnail(Logo)
                .setImage(banners.stepTwoBanner)
                .addFields(
                  {
                    name: `${emojis.info} Tips`,
                    value: fieldsText.tipOne,
                    inline: false,
                  },
                  {
                    name: `${emojis.warning} Warning`,
                    value: fieldsText.tipTwo,
                    inline: false,
                  },
                )
                .setFooter({
                  ///text: `This is for Staff members only, no one else can see it`,
                  text: interaction.guild.name,
                  iconURL: banners.parfaitIcon,
                }),
            ],
            ephemeral: true,
            components: [langButtons],
          });
        }
        default:
      }
    }
  });
};
