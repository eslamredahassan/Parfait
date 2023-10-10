const { Client } = require("discord.js");
const { MongoClient } = require("mongodb");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    try {
      const client = new MongoClient(config.database);
      //// Send message to rejected member ///
      await client.connect();
      console.log("connected");
      const database = client.db("parfaitdatabase");
      const freeze = database.collection("freeze");

      const ap_user = await member.guild.id;
      console.log(`${ap_user.user.username} joined server`);
      if (!ap_user) return;
      // create a document to insert
      if (ap_user > freeze()) {
        const freeze_user = { ap_user_id: ap_user.id };
        const result = await freeze.find(freeze_user);
        console.log(
          `\x1b[0m`,
          `\x1b[32m ├`,
          `\x1b[31m ${interaction.user.username}`,
          `\x1b[0m`,
          `\x1b[33mAPPLICATION ADDED TO`,
          `\x1b[35m Database`,
          `\x1b[35 ${result.insertedId}`,
        );
        await ap_user.roles
          .add(config.banRole)
          .catch(() => console.log("Error Line 135"));
      }
    } finally {
      await client.close();
    }
    run().catch(console.dir);
  });
};
