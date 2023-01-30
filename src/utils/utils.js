const { ButtonBuilder, ButtonStyle } = require("discord.js");

let playBtn = new ButtonBuilder()
  .setCustomId("play")
  .setLabel("play")
  .setStyle(ButtonStyle.Secondary);
let pauseBtn = new ButtonBuilder()
  .setCustomId("pause")
  .setLabel("pause")
  .setStyle(ButtonStyle.Secondary);
let repeatOnBtn = new ButtonBuilder()
  .setCustomId("repeatOn")
  .setLabel("repeat: on")
  .setStyle(ButtonStyle.Secondary);
let repeatOffBtn = new ButtonBuilder()
  .setCustomId("repeatOff")
  .setLabel("repeat: off")
  .setStyle(ButtonStyle.Secondary);
let prevBtn = new ButtonBuilder()
  .setCustomId("prev")
  .setLabel("prev")
  .setStyle(ButtonStyle.Secondary);
let nextBtn = new ButtonBuilder()
  .setCustomId("next")
  .setLabel("next")
  .setStyle(ButtonStyle.Secondary);
let stopBtn = new ButtonBuilder()
  .setCustomId("stop")
  .setLabel("stop")
  .setStyle(ButtonStyle.Secondary);



module.exports = {
  stopBtn,
  nextBtn,
  repeatOffBtn,
  prevBtn,
  repeatOnBtn,
  pauseBtn,
  playBtn,
};
