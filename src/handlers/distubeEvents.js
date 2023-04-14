const { embedBuilder, panelBuilder } = require("../functions/function");
module.exports = async (client) => {
  try {
    let playMode = "play";
    let repeatMode = "off";
    let radioMode = "off";

    // events
    client.distube.on("playSong", async (queue, song) => {
      if (client.swapmsg) {
        client.swapmsg.edit({
          embeds: [embedBuilder(queue, song)],
        });
      } else {
        client.swapmsg = await queue.textChannel.send({
          embeds: [embedBuilder(queue, song)],
          components: [panelBuilder(playMode, repeatMode)],
        });
      }
    });

    client.on("interactionCreate", async (interaction) => {
      if (interaction.isButton()) {
        const { customId, member } = interaction;
        let queue = client.distube.getQueue(interaction.guildId);
        if (!queue) return;
        switch (customId) {
          case "stop":
            playMode = "play";

            await queue.stop().catch((e) => {});
            await interaction.update({
              components: [panelBuilder(playMode, repeatMode)],
            });
            if (!queue.autoplay) queue.toggleAutoplay();
            break;
          case "next":
            if (!queue) return;
            await queue.skip().catch((e) => {});
            await interaction.update({
              components: [panelBuilder(playMode, repeatMode)],
            });

            break;
          case "prev":
            if (!queue) return;
            await queue.previous().catch((e) => {});
            await interaction.update({
              components: [panelBuilder(playMode, repeatMode)],
            });

            break;
          case "play":
            queue.resume();
            playMode = "play";
            await interaction.update({
              components: [panelBuilder(playMode, repeatMode)],
            });

            break;
          case "pause":
            if (!queue) return;

            playMode = "pause";
            queue.pause();

            await interaction.update({
              components: [panelBuilder(playMode, repeatMode, radioMode)],
            });

            break;
          case "repeatOn":
            repeatMode = "off";
            await interaction.update({
              components: [panelBuilder(playMode, repeatMode, radioMode)],
            });
            queue.setRepeatMode(0);
            break;
          case "repeatOff":
            repeatMode = "on";
            await interaction.update({
              components: [panelBuilder(playMode, repeatMode, radioMode)],
            });
            queue.setRepeatMode(1);
            break;
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
