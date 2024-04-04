const { Events, MessageType } = require('discord.js');
const { botInfo, failPlayer, playerInfo } = require('../lib/helpers');

module.exports = [
  {
    name: Events.MessageCreate,
    async execute(memberInfo, message) {
      const player = await playerInfo(memberInfo.id);
      if (message.author.bot || !message.guild || message.author.id != memberInfo.id || player.failed) return;
  
      if (message.type !== MessageType.Reply) {
        const bot = await botInfo();
        message.guild.channels.cache.get(bot.announcementChannel).send(`<@${memberInfo.id}> failed their task!`);
        await failPlayer(memberInfo.id);
      }
    },
  },
];