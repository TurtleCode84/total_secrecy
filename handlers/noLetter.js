const { Events } = require('discord.js');

module.exports = [
  {
    name: Events.MessageCreate,
    async execute(message) {
      if (message.author.bot || !message.guild) return;
  
      if (botInfo.isGame) {
        console.log(message.author.username + " [c]: " + message.content);
      }
    },
  },
  {
    name: Events.MessageUpdate,
    async execute(oldMessage, message) {
      if (message.author.bot || !message.guild) return;

      if (botInfo.isGame) {
        console.log(message.author.username + " [u]: " + message.content);
      }
    },
  },
];