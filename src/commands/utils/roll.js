const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("random number"),
  async execute(interaction) {
    interaction.reply(`${Math.floor(Math.random() * 101)}`);
  },
};
