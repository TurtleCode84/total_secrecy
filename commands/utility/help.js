const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Provides information about the bot.'),
  async execute(interaction) {
    await interaction.reply({ content: 'hey, lazy developer here, I haven\'t gotten around to making a help command yet, but I\'ll get to it soon... probably :P', ephemeral: true });
  },
};