const { SlashCommandBuilder } = require("discord.js");
const { loadData, embedBuilder } = require("../../functions/function");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play your song")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Phrase to search for")
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    if (focusedValue.length == 0) return await interaction.respond([]);
    await interaction.respond(await loadData(focusedValue));
  },

  async execute(interaction, client) {
    
    await interaction.deferReply();
    const playLink = interaction.options.get("query").value;
    await client.distube.play(interaction.member.voice.channel, playLink, {
      member: interaction.member,
      textChannel: interaction.channel,
    });

    const queue = await client.distube.getQueue(interaction);
    if (queue.autoplay) queue.toggleAutoplay();

    if (client.swapmsg) {
      await client.swapmsg.edit({
        embeds: [embedBuilder(queue, queue.songs[0])],
      });
    }

    await interaction.deleteReply();
  },
};
