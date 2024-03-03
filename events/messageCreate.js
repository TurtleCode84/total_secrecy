const { Events } = require('discord.js');
const fs = require('node:fs');
const tasks = require('../tasks.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    if (botInfo.isGame) {
      /*if (message.author.id == currentImposter) {
        console.log('Imposter message received: ' + message.content);
      } else if (currentCrewmates.includes(message.author.id)) {
        console.log('Crewmate message received: ' + message.content);
      }*/
      console.log(message.author.username + ": " + message.content);
    }
    if (message.content == 'ts!dev') {
      message.reply(JSON.stringify(botInfo));
    }
  },
};