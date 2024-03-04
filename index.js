const { createInterface } = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Collection, Routes, GatewayIntentBits } = require('discord.js');
const token = process.env['TOKEN'];
global.botInfo = {
  isGame: false,
  announcementChannel: process.env['ANNOUNCEMENT_CHANNEL'],
  adminRole: process.env['ADMIN_ROLE'],
  playerRole: process.env['PLAYER_ROLE']
}
global.playerInfo = [];
global.handlerInfo = [];

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
  ]
});
const rl = createInterface({ input: process.stdin, output: process.stdout });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

(async ()=>{
  const token = process.env['TOKEN'];
  if(!token) throw new Error('Invalid token');

  const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);

  if(!ratelimitTest.ok) {
    console.log('Something went wrong with the Discord API:');
    console.log(await ratelimitTest.status);
    console.log(await ratelimitTest.json());
    console.log(await ratelimitTest.headers.get('retry-after'));
    process.exit(1);
    return;
  };

  await client.login(token).catch((err) => {
    throw err
  });
  
})();