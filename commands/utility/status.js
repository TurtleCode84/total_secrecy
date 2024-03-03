const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Shows the current status of the game')
    .setDMPermission(false),
  async execute(interaction) {
    switch (botInfo.isGame) {
      case true:
        await interaction.reply(`The game is currently running with ${playerInfo.length} players.`);
        break;
      case false:
        await interaction.reply(`The game is not currently running. ${interaction.guild.roles.cache.get(botInfo.playerRole).members.map(m => m.user.id).length} players are ready for a new round.`);
        break;
    }
  },
};