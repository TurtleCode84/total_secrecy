const { SlashCommandBuilder } = require('discord.js');
const tasks = require('../../tasks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listtasks')
    .setDescription('List all possible tasks')
    .setDMPermission(false),
  async execute(interaction) {
    const msg = tasks.map(task => `- ${task.name}`).join('\n');
    await interaction.reply({ content: msg, ephemeral: true });
  },
};
