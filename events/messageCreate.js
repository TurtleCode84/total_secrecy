const { Events } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    const isGame = fs.readFileSync("../game.json", (error, data) => {
      
      if (error) {
        console.error(error);
        throw err;
      }

      // parsing the JSON object
      // to convert it to a JavaScript object
      const settings = JSON.parse(data);
      return settings.isGame;
    });

    
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