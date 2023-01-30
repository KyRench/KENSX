const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    const command = client.commands.get(interaction.commandName);
    if (interaction.isChatInputCommand()) {
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else if (interaction.isAutocomplete()) {
      if (!command) return;

      try {
        await command.autocomplete(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
