//basic slash command

const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: 'kekw.sqlite' });
const wait = require('node:timers/promises').setTimeout;
const { EmbedBuilder } = require('discord.js');

module.exports = new Object({
  name: 'event',
  description: 'View the current event',
  async run (client, interaction) {

    //your code here

  }
});
