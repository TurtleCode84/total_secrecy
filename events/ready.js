const { Events, ActivityType } = require('discord.js');
const { exec } = require('child_process');
const express = require("express");
const app = express();

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({status: 'online'}); //sets initial presence
    client.user.setActivity('/help', { type: ActivityType.Listening }); //sets initial status

    console.log('Initial status set');
    exec('node deploy-commands.js');

    console.log('Deploying web app');
    app.get("/", (req, res) => res.json({message: 'hello, world!'}));
    const server = app.listen(10000, () => {
      console.log(`Web app listening on port 10000!`);
    });
  },
};