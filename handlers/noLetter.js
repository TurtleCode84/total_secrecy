const { Events } = require('discord.js');
const tasks = require('../tasks.js');

module.exports = [
  {
    name: Events.MessageCreate,
    async execute(memberInfo, message) {
      if (message.author.bot || !message.guild || message.author.id != memberInfo.id) return;
  
      if (message.content.includes(tasks[playerInfo.find(p => p.id == memberInfo.id).task].handler.parameter)) {
        message.guild.channels.cache.get(botInfo.announcementChannel).send(`<@${memberInfo.id}> failed their task!`);
      }
    },
  },
  {
    name: Events.MessageUpdate,
    async execute(memberInfo, oldMessage, message) {
      if (message.author.bot || !message.guild || message.author.id != memberInfo.id) return;

      if (message.content.includes(tasks[playerInfo.find(p => p.id == memberInfo.id).task].handler.parameter)) {
        message.guild.channels.cache.get(botInfo.announcementChannel).send(`<@${memberInfo.id}> failed their task!`);
      }
    },
  },
];