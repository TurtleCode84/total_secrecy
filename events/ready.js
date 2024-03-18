const { Events, ActivityType } = require('discord.js');
const { botInfo, playerInfo, mountHandlers } = require('../lib/helpers');
const { exec } = require('child_process');
const express = require("express");
const app = express();

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}. Checking game state...`);
    const bot = await botInfo();
    if (bot.isGame) {
      const players = await playerInfo();
      players.forEach((player) => {
        mountHandlers(client, player);
      });
      console.log(`Success, mounted handlers for ${players.length} players`);
      client.user.setPresence({status: 'dnd'});
      client.user.setActivity(`for secrets`, { type: ActivityType.Watching });
      console.log('Existing game resumed');
    } else {
      client.user.setPresence({status: 'online'});
      client.user.setActivity('/help', { type: ActivityType.Listening });
      console.log('No game running, starting as usual');
    }

    console.log('Initial status set');
    exec('node deploy-commands.js');

    console.log('Deploying web app');
    app.get("/", (req, res) => res.json({message: 'hello, world!'}));
    const server = app.listen(10000, () => {
      console.log(`Web app listening on port 10000!`);
    });
  },
};