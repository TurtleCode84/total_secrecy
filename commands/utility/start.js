const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts a new round of Total Secrecy'),
  async execute(interaction) {
    if (!member.roles.cache.find(r => r.id === botInfo.adminRole)) {
      await interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true});
      return;
    } else if (botInfo.isGame) {
      await interaction.reply({content: 'A game is already in progress!', ephemeral: true});
      return;
    }

    botInfo.isGame = true;
    await interaction.reply(`Game state changed to true: ${JSON.stringify(botInfo)}`);
  },
};