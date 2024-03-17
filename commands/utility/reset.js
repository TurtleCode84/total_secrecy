const { SlashCommandBuilder } = require('discord.js');
const { botInfo, setGameState } = require('../../lib/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Resets the bot (dangerous!)')
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    if (!interaction.member.roles.cache.find(r => r.id === bot.adminRole)) {
      await interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true});
      return;
    }

    await interaction.deferReply();

    console.log('Removing player role from all server members');
    const allMembers = await interaction.guild.members.fetch();
    const nonBotMembers = await allMembers.filter(member => !member.user.bot);
    await nonBotMembers.forEach((member) => {
      member.roles.remove(bot.playerRole);
      console.log(`Removed role from ${member.user.username}`);
    });

    console.log('Purging PlayerDB/HandlerDB and resetting game state');
    playerInfo = []; // mongofy
    handlerInfo.forEach((h) => { // mongofy
      interaction.client.removeListener(h.name, h.callback);
      console.log(`Removed ${h.name}`);
    });
    handlerInfo = []; // mongofy
    await setGameState(false);
    await interaction.editReply('The bot has been reset, any current rounds have been ended and all players have been removed from the game.');
  },
};