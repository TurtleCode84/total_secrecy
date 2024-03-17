const { SlashCommandBuilder } = require('discord.js');
const { botInfo, playerInfo } = require('../../lib/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Shows the current status of the game')
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    const players = await playerInfo();
    switch (bot.isGame) {
      case true:
        const tplayers = await players.map(p => `- ${p.username}`);
        await interaction.reply(`The game is currently running with **${tplayers.length}** players${tplayers.length > 0 ? ':\n' + tplayers.join('\n') : '.'}`);
        break;
      case false:
        const fplayers = await interaction.guild.roles.cache.get(bot.playerRole).members.map(m => `- ${m.user.username}`);
        await interaction.reply(`The game is not currently running. **${fplayers.length}** players are ready for a new round${fplayers.length > 0 ? ':\n' + fplayers.join('\n') : '.'}`);
        break;
    }
  },
};