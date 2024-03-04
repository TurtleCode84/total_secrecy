const { Events } = require('discord.js');

module.exports = [
  {
    name: Events.MessageCreate,
    async execute(memberInfo, message) {
      if (message.author.bot || !message.guild || message.author.id != memberInfo.id) return;
  
      if (botInfo.isGame) {
        console.log(memberInfo.username + " [c]: " + message.content);
      }
    },
  },
  {
    name: Events.MessageUpdate,
    async execute(memberInfo, oldMessage, message) {
      if (message.author.bot || !message.guild || message.author.id != memberInfo.id) return;

      if (botInfo.isGame) {
        console.log(memberInfo.username + " [u]: " + message.content);
      }
    },
  },
];