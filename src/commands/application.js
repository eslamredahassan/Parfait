const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Modal,
  TextInputComponent,
} = require("discord.js");

const os = require("os");
const moment = require("moment");
const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

const packageJSON = require("../../package");
const responses = require("../assest/responses.js");
const interface = require("../assest/interface.js");
const fieldsText = require("../assest/fieldsText.js");
const banners = require("../assest/banners.js");
const errors = require("../assest/errors.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  let Logo = guild.iconURL({ dynamic: true });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      switch (interaction.commandName) {
        case "contact_dev":
          {
            console.log(
              `\x1b[0m`,
              `\x1b[31m 〢`,
              `\x1b[33m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m ${interaction.user.username} USED`,
              `\x1b[35m Message Dev Command`,
            );
            //// Modal application code ///
            let sendToDev_modal = new Modal()
              .setTitle(`📧 Send a message to the developer`)
              .setCustomId(`sendToDev_modal`);

            const message = new TextInputComponent()
              .setCustomId("user_message")
              .setLabel(`Message`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(365)
              .setRequired(true)
              .setPlaceholder(`Type your message here`)
              .setStyle(2);

            let row_usermessage = new MessageActionRow().addComponents(message);
            sendToDev_modal.addComponents(row_usermessage);
            await interaction.showModal(sendToDev_modal);
          }
          break;
        case "report_bug": {
          console.log(
            `\x1b[0m`,
            `\x1b[31m 〢`,
            `\x1b[33m ${moment(Date.now()).format("lll")}`,
            `\x1b[34m ${interaction.user.username} USED`,
            `\x1b[35m Report Bug Command`,
          );
          //// Modal application code ///
          let report_modal = new Modal()
            .setTitle(`🐞 Report bug`)
            .setCustomId(`report_modal`);

          const where = new TextInputComponent()
            .setCustomId("bug_where")
            .setLabel(`Which bug you want to report?`.substring(0, 45))
            .setMinLength(1)
            .setMaxLength(65)
            .setRequired(true)
            .setPlaceholder(`Name the bug or say where you found it`)
            .setStyle(1);
          const details = new TextInputComponent()
            .setCustomId("bug_details")
            .setLabel(`Type details about this bug`.substring(0, 45))
            .setMinLength(1)
            .setMaxLength(365)
            .setRequired(true)
            .setPlaceholder(`Type the details here `)
            .setStyle(2);

          let row_where = new MessageActionRow().addComponents(where);
          let row_details = new MessageActionRow().addComponents(details);
          report_modal.addComponents(row_where, row_details);
          await interaction.showModal(report_modal);
        }
      }
    }
    if (interaction.customId === "report_modal") {
      let where = interaction.fields.getTextInputValue("bug_where");
      let details = interaction.fields.getTextInputValue("bug_details");

      let reportBugChannel = client.channels.cache.get(config.reportBugChannel);
      if (!reportBugChannel) return;

      const reply = new MessageActionRow().addComponents([
        new MessageButton()
          .setStyle(2)
          .setCustomId("#profile")
          .setLabel(`Reply ${interaction.user.username}`)
          .setEmoji(emojis.dm),
      ]);

      /// Embed of data in review room ///
      await reportBugChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(color.gray)
            .setTitle(`${emojis.log} **Bug report**`)
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(``)
            //.setThumbnail( interaction.user.displayAvatarURL() )
            .setImage(banners.channelBugBanner)
            .addFields([
              {
                name: `${emojis.id} Reported by`,
                value: `${emojis.threadMark} ${interaction.user}`,
                inline: true,
              },
              {
                name: `${emojis.time} Reported Since`,
                value: `${emojis.threadMark} <t:${Math.floor(
                  Date.now() / 1000,
                )}:R>`,
                inline: true,
              },
              {
                name: `${emojis.bug} Founded in`,
                value: `${emojis.threadMark} ${where}`,
                inline: false,
              },
              {
                name: `${emojis.reason} Bug details`,
                value: `${emojis.threadMark} ${details}`,
                inline: false,
              },
            ])
            .setTimestamp()
            .setFooter({
              text: interaction.user.id,
              iconURL: banners.parfaitIcon,
            }),
        ],
        components: [reply],
      });

      return await interaction.reply({
        embeds: [
          {
            title: `${emojis.check} Your report has been sent to the developer`,
            description: `- Thank you ${interaction.user} for report this bug\n- We are also sorry to make you encounter this bug and we will work to fix it as soon as possible`,
            color: color.gray,
            ///thumbnail: { url: 'https://i.imgur.com/FiSTCop.png', },
            image: { url: banners.reportBugBanner },
          },
        ],
        //this is the important part
        ephemeral: true,
        components: [],
      });
    }
    if (interaction.customId === "sendToDev_modal") {
      let message = interaction.fields.getTextInputValue("user_message");

      let dmDevChannel = client.channels.cache.get(config.dmDevChannel);
      if (!dmDevChannel) return;

      const reply = new MessageActionRow().addComponents([
        new MessageButton()
          .setStyle(2)
          .setCustomId("#profile")
          .setLabel(`Reply ${interaction.user.username}`)
          .setEmoji(emojis.dm),
      ]);

      /// Embed of data in review room ///
      await dmDevChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(color.gray)
            .setTitle(`${emojis.newMail} **New Message**`)
            .setDescription(``)
            //.setThumbnail(banners.newMessageBanner)
            .setImage(banners.newMessageBanner)
            .addFields(
              {
                name: `${emojis.id} Sender`,
                value: `${emojis.threadMark} ${interaction.user}`,
                inline: true,
              },
              {
                name: `${emojis.time} Sent Since`,
                value: `${emojis.threadMark} <t:${Math.floor(
                  Date.now() / 1000,
                )}:R>`,
                inline: true,
              },
              {
                name: `${emojis.email} Message Content`,
                value: `${emojis.threadMark} ${message}`,
                inline: false,
              },
            )
            .setTimestamp()
            .setFooter({
              text: interaction.user.id,
              iconURL: banners.parfaitIcon,
            }),
        ],
        components: [reply],
      });

      await interaction.reply({
        embeds: [
          {
            title: `${emojis.check} Your message sent has been sent to my developer`,
            description: `- Thank you ${interaction.user} Your message will be answered soon if necessary`,
            color: color.gray,
            ///thumbnail: { url: 'https://i.imgur.com/FiSTCop.png', },
            image: { url: banners.channelMessageBanner },
          },
        ],
        //this is the important part
        ephemeral: true,
        components: [],
      });
    }
  });
};
