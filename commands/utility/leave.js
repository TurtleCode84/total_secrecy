const { SlashCommandBuilder } = require('discord.js');
const { botInfo } = require('../../lib/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leaves the game')
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    if (bot.isGame && interaction.member._roles.includes(bot.playerRole)) {
      await interaction.reply({ content: 'You cannot leave the game mid-round!', ephemeral: true});
    } else if (interaction.member._roles.includes(bot.playerRole)) {
      await interaction.member.roles.remove(bot.playerRole);
      await interaction.reply('You have been removed from the game.');
    } else {
      await interaction.reply({ content: 'You are not currently in the game.', ephemeral: true });
    }
  },
};