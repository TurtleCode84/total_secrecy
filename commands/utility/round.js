const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { botInfo, playerInfo } = require('../../lib/helpers');
const tasks = require('../../tasks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('round')
    .setDescription('View admin info about the current round')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    const players = await playerInfo();
    if (!bot.isGame) {
      await interaction.reply({ content: 'There is no round currently running.', ephemeral: true });
      return;
    } else if (players.some(p => p.id == interaction.user.id)) {
      await interaction.reply({ content: 'You cannot view admin info for a round you are playing in!', ephemeral: true });
      return;
    }

    const mappedPlayers = players.map(player => `- ${player.username} ${player.failed ? ':x:' : ':white_check_mark:'}: ${tasks[player.task].name}`).join('\n');
    await interaction.reply({ content: `**Players:**\n${mappedPlayers}\n**Listeners:** ${handlerInfo.length}`, ephemeral: true });
  },
};