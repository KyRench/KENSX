module.exports = (client) => {
  client.handleEvents = async (eventFiles, path) => {
    for (const file of eventFiles) {
      const baseEvent = require(`../events/${file}`);
      

      if (baseEvent.once) {
        client.once(baseEvent.name, (...args) => baseEvent.execute(...args,client));
      } else {
        client.on(baseEvent.name, (...args) => baseEvent.execute(...args,client));
      }
    }
  };
};
