const { SlashCommandBuilder } = require('discord.js');
const { botInfo } = require('../../lib/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Joins the game')
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    if (bot.isGame && !interaction.member._roles.includes(bot.playerRole)) {
      await interaction.reply({ content: 'There is already a game running, you cannot join mid-round.', ephemeral: true });
    } else if (!interaction.member._roles.includes(bot.playerRole)) {
      await interaction.member.roles.add(bot.playerRole);
      await interaction.reply('You have been added to the game.');
    } else {
      await interaction.reply({ content: 'You are already playing.', ephemeral: true });
    }
  },
};