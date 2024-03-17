const { SlashCommandBuilder } = require('discord.js');
const { botInfo, playerInfo } = require('../../lib/helpers');
const tasks = require('../../tasks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('task')
    .setDescription('Secretly view your assigned task')
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    const player = await playerInfo(interaction.user.id);
    if (!bot.isGame) {
      await interaction.reply({ content: 'There is no round currently running, you do not have any tasks.', ephemeral: true });
      return;
    } else if (!player) {
      await interaction.reply({ content: 'You are not currently playing.', ephemeral: true });
      return;
    } else if (player.task == -1) {
      await interaction.reply({ content: 'You have not been assigned a task.', ephemeral: true });
      return;
    }
    await interaction.reply({ content: `**Your task is:**\n- ${tasks[player.task].name}`, ephemeral: true });
  },
};