const { SlashCommandBuilder } = require('discord.js');
const botInfo = require('../../lib/botInfo');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leaves the game')
    .setDMPermission(false),
  async execute(interaction) {
    if (botInfo.isGame && interaction.member._roles.includes(botInfo.playerRole)) {
      await interaction.reply({ content: 'You cannot leave the game mid-round!', ephemeral: true});
    } else if (interaction.member._roles.includes(botInfo.playerRole)) {
      await interaction.member.roles.remove(botInfo.playerRole);
      await interaction.reply('You have been removed from the game.');
    } else {
      await interaction.reply({ content: 'You are not currently in the game.', ephemeral: true });
    }
  },
};