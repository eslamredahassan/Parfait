const { client } = require("discord.js");
const OpenAI = require("openai");

module.exports = async (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "ask") {
      await interaction.deferReply();
      const openai = new OpenAI({ apiKey: process.env.OpenAI_Key });
      const question = interaction.options.getString("question");

      const howOldQuestion = [
        `How dare you ask a beautiful lady her age!`,
        `It's a secret`,
        `I have no time to answer this question`,
      ];
      const howOldRandomAnswer =
        howOldQuestion[Math.floor(Math.random() * howOldQuestion.length)];

      const questionMapping = {
        "who created you": "IEgyGamerI created me.",
        "who made you": "IEgyGamerI made me.",
        "what is your creator": "IEgyGamerI created me.",
        "who is your developer": "my developer is IEgyGamerI.",
        "who are you": "Im Parfait.",
        "how old are you": howOldRandomAnswer,
        "where are you from": "Im from Library World",
        "can i apply to sun": `Yeah of course, go <#1120323307850444820> and press my application button`,
        //------------------------------------------------------------------------------------------------//
      };

      // Process custom answers
      for (const [key, value] of Object.entries(questionMapping)) {
        if (question.toLowerCase().includes(key)) {
          await interaction.editReply(value);
          return;
        }
      }

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          //prompt: question,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: question },
          ],
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 1,
          stop: "\n",
        });

        const answer = response.choices[0].message;

        await interaction.editReply(answer);
      } catch (error) {
        console.error(error.message);
        await interaction.followUp(
          "Oops! There was an error processing your request.",
        );
      }
    }
  });
};
