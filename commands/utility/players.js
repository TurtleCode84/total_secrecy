const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Lists currently joined players')
    .setDMPermission(false),
  async execute(interaction) {
    const players = await interaction.guild.roles.cache.get(botInfo.playerRole).members.map(m => m.user.username);
    await interaction.reply(players.length > 0 ? '**Currently playing:**\n' + players.join('\n') : 'No one is currently playing.');
  },
};