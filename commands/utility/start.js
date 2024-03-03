const { SlashCommandBuilder } = require('discord.js');
const tasks = require('../../tasks.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts a new round of Total Secrecy'),
  async execute(interaction) {
    if (!interaction.member.roles.cache.find(r => r.id === botInfo.adminRole)) {
      await interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true});
      return;
    } else if (botInfo.isGame) {
      await interaction.reply({content: 'A round is already in progress! Use \`/stop\` to end the current round early.', ephemeral: true});
      return;
    } else if (interaction.guild.roles.cache.get(botInfo.playerRole).members.map(m => m.user.id).length < 2) {
      await interaction.reply({content: 'There are not enough players to start a round.', ephemeral: true});
      return;
    }

    await interaction.deferReply({ephemeral: true});
    console.log('Preparing a new round of Total Secrecy!');

    botInfo.isGame = true;
    console.log('Game state locked');

    // Get all members
    const allPlayers = await interaction.guild.roles.cache.get(botInfo.playerRole).members;
    const nonBotMembers = await allPlayers.filter(member => !member.user.bot);
    console.log('Fetched and filtered all members');

    nonBotMembers.forEach((member) => {
      const memberInfo = {
        id: member.user.id,
        username: member.user.username,
        task: Math.floor(Math.random() * tasks.length),
        failed: false,
        score: 0
      };
      playerInfo.push(memberInfo);
      console.log(`Pushed ${memberInfo.username} to PlayerDB`);
    });
    console.log(`Success, PlayerDB has ${playerInfo.length} entries`);

    await interaction.editReply({content: 'A new round of Total Secrecy has started!', ephemeral: true});
    await interaction.member.guild.channels.cache.get(botInfo.announcementChannel).send(`<@&${botInfo.playerRole}> A server-wide game of Total Secrecy has started! Check your DMs for your tasks, or do \`/tasks\` to view them.`);
  },
};