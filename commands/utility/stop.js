const { SlashCommandBuilder, ActivityType } = require('discord.js');
const { botInfo, setGameState, purgeDB } = require('../../lib/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Ends the current round of Total Secrecy')
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    if (!interaction.member.roles.cache.find(r => r.id === bot.adminRole)) {
      await interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true});
      return;
    } else if (!bot.isGame) {
      await interaction.reply({content: 'There is no round currently running!', ephemeral: true});
      return;
    }

    console.log('Purging PlayerDB/HandlerDB and resetting game state');
    await purgeDB('players');
    handlerInfo.forEach((h) => {
      interaction.client.removeListener(h.name, h.callback);
      console.log(`Removed ${h.name}`);
    });
    handlerInfo = [];
    await setGameState(false);
    await interaction.reply('The current round of Total Secrecy has ended.');

    await interaction.client.user.setPresence({status: 'online'});
    await interaction.client.user.setActivity(`/help`, { type: ActivityType.Listening });
  },
};