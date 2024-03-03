const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Joins the game'),
  async execute(interaction) {
    if (botInfo.isGame && !interaction.member.roles.cache.includes(botInfo.playerRole)) {
      await interaction.reply('There is already a game running, you cannot join mid-round.');
    } else if (!interaction.member.roles.cache.includes(botInfo.playerRole)) {
      await interaction.member.roles.add(botInfo.playerRole);
      await interaction.reply('You have been added to the game.');
    } else {
      await interaction.reply('You are already playing.');
    }
  },
};