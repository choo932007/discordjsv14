//example of slash command (add a mention)
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: 'kekw.sqlite' });
const wait = require('node:timers/promises').setTimeout;
const { EmbedBuilder } = require('discord.js');

module.exports = new Object({
  name: 'profile',
  description: 'View user profile',
  options: [
  {
  name: 'target',
  description: 'mention a user',
  required: false,
  type: 6
}
],
  async run (client, interaction) {


  // Your code here
  
}
})
