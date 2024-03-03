const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leaves the game'),
  async execute(interaction) {
    if (botInfo.isGame && interaction.member.roles.cache.includes(botInfo.playerRole)) {
      await interaction.reply('You cannot leave the game mid-round!');
    } else if (interaction.member.roles.cache.includes(botInfo.playerRole)) {
      await interaction.member.roles.remove(botInfo.playerRole);
      await interaction.reply('You have been removed from the game.');
    } else {
      await interaction.reply('You are not currently in the game.');
    }
  },
};