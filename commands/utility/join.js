const { SlashCommandBuilder } = require('discord.js');
const botInfo = require('../../lib/botInfo');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Joins the game')
    .setDMPermission(false),
  async execute(interaction) {
    if (botInfo.isGame && !interaction.member._roles.includes(botInfo.playerRole)) {
      await interaction.reply({ content: 'There is already a game running, you cannot join mid-round.', ephemeral: true });
    } else if (!interaction.member._roles.includes(botInfo.playerRole)) {
      await interaction.member.roles.add(botInfo.playerRole);
      await interaction.reply('You have been added to the game.');
    } else {
      await interaction.reply({ content: 'You are already playing.', ephemeral: true });
    }
  },
};