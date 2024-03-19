const { Events } = require('discord.js');

module.exports = {
  name: Events.Warn,
  async execute(warning) {
    console.log(warning);
  },
};