const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.gpt_key,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("ChatGPT bot")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Phrase to search for")

        .setRequired(true)
    ),
  async execute(interaction, client) {
    const query = interaction.options.get("query").value;
    let conversationLog = [{ role: "system", content: "Быдло бот" }];

    conversationLog.push({
      role: "user",
      content: query,
    });

    
    await interaction.deferReply();

    const response = await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversationLog,
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });

    let result = response.data.choices[0].message.content;
    await interaction.editReply(`\`${query}\` \n ${result}`);
  },
};
