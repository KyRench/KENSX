const { SlashCommandBuilder } = require("discord.js");

const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stat")
    .setDescription("lol profile")
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("Phrase to search for")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const nickname = interaction.options.get("nickname").value;
    //const string = nickname.join("%20");
    

    const riotkey = "api_key=RGAPI-38041fd6-7d0e-4e3f-9fe7-62e6ae033e80";

    const summonerResponse = await fetch(
      `https://ru.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?${riotkey}`
    );
    const summoner = await summonerResponse.json();
    // eslint-disable-next-line no-prototype-builtins
    if (summoner.hasOwnProperty("status")) {
      if (summoner.status.status_code === 403)
        return interaction.reply("Админу пора бы обновить ключ");
      if (summoner.status.status_code === 404)
        return interaction.reply("Призыватель не найден");
    }

    const statResponse = await fetch(
      `https://ru.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?${riotkey}`
    );
    const summonerStat = await statResponse.json();

    if (summonerStat.length === 0)
      return interaction.reply("Призыватель не играл в ранкеды");

    // console.log(summonerStat);
    // console.log("//////////////////////////////");
    // console.log(summonerStat[0]);
    // console.log("//////////////////////////////");
    // console.log(summoner);
    const ddragonVersionResponce = await fetch(
      `https://ddragon.leagueoflegends.com/api/versions.json`
    );
    const ddragonVersion = await ddragonVersionResponce.json();
    const ddragonURL =
      "https://ddragon.leagueoflegends.com/cdn/" +
      ddragonVersion[0] +
      "/img/profileicon/";

    const summonerIconURL = ddragonURL + summoner.profileIconId + ".png";

    const stat =
      summonerStat[0].summonerName +
      " - " +
      summonerStat[0].tier +
      " " +
      summonerStat[0].rank +
      " " +
      summonerStat[0].leaguePoints +
      "lp - " +
      Math.floor(
        (summonerStat[0].wins /
          (summonerStat[0].wins + summonerStat[0].losses)) *
          100
      ) +
      "% WR";

    exampleEmbed = {
      color: "000000",
      description: summoner.name,
      thumbnail: {
        url: `${summonerIconURL}`,
      },
      // fields: [
      //   {
      //     name: `Author`,
      //     value: `** [\`${song.uploader.name}\`](${song.uploader.url}) **`,
      //     inline: true,
      //   },

      //   {
      //     name: `Duration`,
      //     value: `\`${song.formattedDuration}\``,
      //     inline: true,
      //   },
      //   {
      //     name: `Next song`,
      //     value: `\`${nextSong ? nextSong.name : "nothing..."}\``,
      //     inline: true,
      //   },
      // ],
      timestamp: new Date().toISOString(),
      // footer: {
      //   text: `Requested By ${song.user.tag}`,
      //   icon_url: song.user.displayAvatarURL(),
      // },
    };
    interaction.channel.send({ embeds: [exampleEmbed] });
  },
};
