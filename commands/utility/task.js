const { SlashCommandBuilder } = require('discord.js');
const tasks = require('../tasks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gettask')
    .setDescription('get your sussy task'),
  async execute(interaction) {
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    await interaction.reply(`your sussy task is: ${task}`);
  },
};