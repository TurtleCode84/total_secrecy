const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const tasks = require('../../tasks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('round')
    .setDescription('View admin info about the current round')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    if (!botInfo.isGame) {
      await interaction.reply({ content: 'There is no round currently running.', ephemeral: true });
      return;
    } else if (playerInfo.some(p => p.id == interaction.user.id)) {
      await interaction.reply({ content: 'You cannot view admin info for a round you are playing in!', ephemeral: true });
      return;
    }

    const players = playerInfo.map(player => `- ${player.username} ${player.failed ? ':x:' : ':white_check_mark:'}: ${tasks[player.task].name}`).join('\n');
    await interaction.reply({ content: `**Players:**\n${players}\n**Listeners:** ${handlerInfo.length}`, ephemeral: true });
  },
};