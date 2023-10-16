const {
  MessageActionRow,
  MessageEmbed,
  Modal,
  TextInputComponent,
} = require("discord.js");

const moment = require("moment");

const banners = require("../assest/banners.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");

module.exports = async (client, config) => {
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      switch (interaction.commandName) {
        case "feedback": {
          console.log(
            `\x1b[0m`,
            `\x1b[31m 〢`,
            `\x1b[33m ${moment(Date.now()).format("lll")}`,
            `\x1b[34m ${interaction.user.username} USED`,
            `\x1b[35m Feedback Command`,
          );
          //// Modal application code ///
          let feedback_modal = new Modal()
            .setTitle(`📑 Feedback`)
            .setCustomId(`feedback_modal`);

          const feedback = new TextInputComponent()
            .setCustomId("feedback")
            .setLabel(`Type your feedback`.substring(0, 45))
            .setMinLength(1)
            .setMaxLength(365)
            .setRequired(true)
            .setPlaceholder(`Type your feedback here `)
            .setStyle(2);

          let row_feedback = new MessageActionRow().addComponents(feedback);
          feedback_modal.addComponents(row_feedback);
          await interaction.showModal(feedback_modal);
        }
      }
    }
    if (interaction.customId === "feedback_modal") {
      let feedback = interaction.fields.getTextInputValue("feedback");

      let reportBugChannel = client.channels.cache.get(config.reportBugChannel);
      if (!reportBugChannel) return;

      /// Embed of data in review room ///
      await reportBugChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(color.gray)
            .setTitle(`${emojis.log} **Feedback**`)
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(``)
            //.setThumbnail( interaction.user.displayAvatarURL() )
            .setImage(banners.channelBugBanner)
            .addFields([
              {
                name: `${emojis.id} Feedback From`,
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
                name: `${emojis.reason} Feedback Message`,
                value: `${emojis.threadMark} ${feedback}`,
                inline: false,
              },
            ])
            .setTimestamp()
            .setFooter({
              text: interaction.user.id,
              iconURL: banners.parfaitIcon,
            }),
        ],
        components: [],
      });

      console.log(
        `\x1b[0m`,
        `\x1b[31m 〢`,
        `\x1b[33m ${moment(Date.now()).format("lll")}`,
        `\x1b[34m ${interaction.user.username} SENT`,
        `\x1b[35m His Feedback`,
      );

      return await interaction.reply({
        embeds: [
          {
            title: `${emojis.check} Your feedback has been sent to the developer`,
            description: `- Thank you ${interaction.user} for letting us know your opinion about ${client.user.username}`,
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
  });
};
