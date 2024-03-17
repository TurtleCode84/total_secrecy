const { Events } = require('discord.js');
const { botInfo } = require('../lib/helpers');
const tasks = require('../tasks.js');

module.exports = [
  {
    name: Events.MessageCreate,
    async execute(memberInfo, message) {
      if (message.author.bot || !message.guild || message.author.id != memberInfo.id || playerInfo.find(p => p.id == memberInfo.id).failed) return;
  
      if (message.content.includes(tasks[playerInfo.find(p => p.id == memberInfo.id).task].handler.parameter)) {
        const bot = await botInfo();
        message.guild.channels.cache.get(bot.announcementChannel).send(`<@${memberInfo.id}> failed their task!`);
        playerInfo[playerInfo.findIndex(p => p.id == memberInfo.id)].failed = true;
      }
    },
  },
  {
    name: Events.MessageUpdate,
    async execute(memberInfo, oldMessage, message) {
      if (message.author.bot || !message.guild || message.author.id != memberInfo.id || playerInfo.find(p => p.id == memberInfo.id).failed) return;

      if (message.content.includes(tasks[playerInfo.find(p => p.id == memberInfo.id).task].handler.parameter)) {
        const bot = await botInfo();
        message.guild.channels.cache.get(bot.announcementChannel).send(`<@${memberInfo.id}> failed their task!`);
        playerInfo[playerInfo.findIndex(p => p.id == memberInfo.id)].failed = true;
      }
    },
  },
];