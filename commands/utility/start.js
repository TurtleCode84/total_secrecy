const { SlashCommandBuilder, ActivityType } = require('discord.js');
const tasks = require('../../tasks.js');
const fs = require('node:fs');
const path = require('node:path');
const handlersPath = path.join(__dirname, '../../handlers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts a new round of Total Secrecy')
    .setDMPermission(false),
  async execute(interaction) {
    if (!interaction.member.roles.cache.find(r => r.id === botInfo.adminRole)) {
      await interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true});
      return;
    } else if (botInfo.isGame) {
      await interaction.reply({content: 'A round is already in progress! Use \`/stop\` to end the current round early.', ephemeral: true});
      return;
    } else if (interaction.guild.roles.cache.get(botInfo.playerRole).members.map(m => m.user.id).length < 1) { // 2
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
      const handlerFile = fs.readdirSync(handlersPath).find(file => file == `${tasks[memberInfo.task].handler.identifier}.js`);
      const filePath = path.join(handlersPath, handlerFile);
      
      const listeners = require(filePath);
      listeners.forEach((listener) => {
        if (listener.once) {
          interaction.client.once(listener.name, (...args) => listener.execute(...args));
        } else {
          interaction.client.on(listener.name, (...args) => listener.execute(...args));
        }
        console.log(`Loaded ${listener.name} listener`);
      });
      console.log(`All events for ${memberInfo.username} loaded`);
    });
    console.log(`Success, PlayerDB has ${playerInfo.length} entries`);

    await interaction.client.user.setPresence({status: 'dnd'});
    await interaction.client.user.setActivity(`for secrets`, { type: ActivityType.Watching });
    
    await interaction.editReply({content: 'A new round of Total Secrecy has started!', ephemeral: true});
    await interaction.guild.channels.cache.get(botInfo.announcementChannel).send(`<@&${botInfo.playerRole}> A server-wide game of Total Secrecy has started! Check your DMs for your tasks, or do \`/task\` to view them.`);

    nonBotMembers.forEach((member) => {
      member.send(`A new round of Total Secrecy has started in \`${interaction.guild.name}\`!\nHere is your task:\n${tasks[playerInfo.find(p => p.id === member.user.id).task].name}`);
    });
    await interaction.followUp({content: 'All players have been given their tasks!', ephemeral: true});
  },
};