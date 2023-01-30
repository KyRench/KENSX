const fetch = require("node-fetch");
const { ActionRowBuilder } = require("discord.js");
const { ButtonBuilder, ButtonStyle } = require("discord.js");
const {playBtn,pauseBtn,repeatOnBtn,repeatOffBtn,prevBtn,nextBtn,stopBtn} = require('../utils/utils')



async function loadData(query) {
  let data = [];
  let feed = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCgdD5oaHbAPb8LKpnVDZH1B8qDOsj03_4&type=video&q=${query}`
  );
  const searchResult = await feed.json();
  try {
    for (let item of searchResult.items) {
      let title = item.snippet.title;
      data.push({
        name: title.slice(0, 90) + "...",
        value: title.slice(0, 90) + "...",
      });
    }
  } catch (e) {
    return;
  }

  return data;
}

function embedBuilder(queue, song) {
  let nextSong = queue.songs[1];
  return (exampleEmbed = {
    color: "000000",
    description: `** [\`${song.name.slice(0, 50) + "..."}\`](${song.url}) **`,
    thumbnail: {
      url: `${song.thumbnail}`,
    },
    fields: [
      {
        name: `Author`,
        value: `** [\`${song.uploader.name}\`](${song.uploader.url}) **`,
        inline: true,
      },

      {
        name: `Duration`,
        value: `\`${song.formattedDuration}\``,
        inline: true,
      },
      {
        name: `Next song`,
        value: `\`${
          nextSong ? nextSong.name.slice(0, 39) + "..." : "nothing..."
        }\``,
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: `Requested By ${song.user.tag}`,
      icon_url: song.user.displayAvatarURL(),
    },
  });
}

function panelBuilder(playMode, repeatMode) {
  return (panel = new ActionRowBuilder().addComponents(
    prevBtn,
    playMode == "play" ? pauseBtn : playBtn,
    nextBtn,
    repeatMode == "off" ? repeatOffBtn : repeatOnBtn,
    stopBtn
  ));
}

module.exports = {
  loadData,
  panelBuilder,
  embedBuilder,
};
