const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({status: 'online'}); //sets initial presence
    client.user.setActivity('/help', { type: ActivityType.Listening }); //sets initial status
  },
};