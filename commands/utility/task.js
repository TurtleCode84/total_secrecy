const { SlashCommandBuilder } = require('discord.js');
const tasks = require('../../tasks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('task')
    .setDescription('Secretly view your assigned task')
    .setDMPermission(false),
  async execute(interaction) {
    if (!botInfo.isGame) {
      await interaction.reply({ content: 'There is no round currently running, you do not have any tasks.', ephemeral: true });
      return;
    } else if (!playerInfo.some(p => p.id == interaction.user.id)) {
      await interaction.reply({ content: 'You are not currently playing.', ephemeral: true });
      return;
    } else if (playerInfo.some(p => p.id == interaction.user.id && p.task == -1)) {
      await interaction.reply({ content: 'You have not been assigned a task.', ephemeral: true });
      return;
    }
    await interaction.reply({ content: `**Your task is:**\n- ${tasks[playerInfo.find(p => p.id == interaction.user.id).task].name}`, ephemeral: true });
  },
};