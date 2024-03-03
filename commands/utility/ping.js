const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pings the bot')
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.reply(`Pong! The round trip took ${Date.now() - interaction.createdTimestamp}ms.`);
  },
};