const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;
    
    if (isGame) {
      /*if (message.author.id == currentImposter) {
        console.log('Imposter message received: ' + message.content);
      } else if (currentCrewmates.includes(message.author.id)) {
        console.log('Crewmate message received: ' + message.content);
      }*/
      console.log(message.author.username + ": " + message.content);
    }
  },
};