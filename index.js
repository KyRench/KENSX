const { DisTube } = require("distube");
const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const fs = require("node:fs");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
require("dotenv").config();
const client = new Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.swapmsg;
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  youtubeCookie: process.env.cookie,
  nsfw: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin({ update: false }),
  ],
});

const handlers = fs
  .readdirSync("./src/handlers")
  .filter((file) => file.endsWith("js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith("js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of handlers) {
    require(`./src/handlers/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token);
})();

// // Удаление slash команд
// // rest
// //   .get(Routes.applicationGuildCommands("config.client_id, config.guild_id))
// //   .then((data) => {
// //     const promises = [];
// //     for (const command of data) {
// //       const deleteUrl = `${Routes.applicationGuildCommands(
// //         config.client_id,
// //         config.guild_id
// //       )}/${command.id}`;
// //       promises.push(rest.delete(deleteUrl));
// //     }
// //     return Promise.all(promises);
// //   });
