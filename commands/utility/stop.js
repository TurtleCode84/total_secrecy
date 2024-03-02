const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Ends the current round of Total Secrecy'),
  async execute(interaction) {
    if (!interaction.member.roles.cache.find(r => r.id === botInfo.adminRole)) {
      await interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true});
      return;
    } else if (!botInfo.isGame) {
      await interaction.reply({content: 'There is no round currently running!', ephemeral: true});
      return;
    }

    botInfo.isGame = false;
    await interaction.reply(`Game state changed to false: ${JSON.stringify(botInfo)}`);
  },
};