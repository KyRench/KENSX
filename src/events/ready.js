const { Events } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(client.user.username + " READY");
    client.user.setPresence({ activities: [{ name: "Visual Studio Code" }] });
    
  },
};
