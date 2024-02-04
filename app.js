const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Routes, GatewayIntentBits, ActivityType } = require('discord.js');
const prefix = 'sus!';
const admin = ['1017553088464310272']; // user id

var isGame = false; // switch for listening to game activity
var currentImposter; // temporary storage variable
var currentCrewmates; // temporary storage variable

const channel = '1203822407354155068';

const sus_player = '1203792083538681958';
const sus_crewmate = '1203737581984948335';
const sus_imposter = '1203741209714106408';

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

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild)
        return;
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift();
        switch (command) {
            case 'ping':
                const pingMsg = await message.reply('Pinging...');
                await pingMsg.edit(`Pong! The round trip took ${Date.now() - pingMsg.createdTimestamp}ms.`);
                break;
            
            case 'players':
                const players = await message.guild.roles.cache.get(sus_player).members.map(m => m.user.username);
                await message.reply(players.length > 0 ? '**Currently playing:**\n' + players.join('\n') : 'No one is playing.');
                break;
            
            case 'join':
                if (isGame) {
                  await message.reply('There is already a game running, you cannot join mid-round.');
                } else if (message.member._roles.includes(sus_player)) {
                  await message.reply('You are already a player.');
                } else {
                  await message.member.roles.add(sus_player);
                  await message.reply('You have been added to the game.');
                }
                break;

            case 'leave':
              if (isGame && message.member._roles.includes(sus_player)) {
                await message.reply('You cannot leave the game mid-round!');
              } else if (message.member._roles.includes(sus_player)) {
                await message.member.roles.remove(sus_player);
                await message.reply('You have been removed from the game.');
              } else {
                await message.reply('You are not currently in the game.');
              }
              break;
          
            case 'start':
                if (!admin.includes(message.author.id)) {
                  await message.reply('You do not have permission to use this command.');
                } else if (isGame) {
                  await message.reply('A game is already running!');
                } else if (message.guild.roles.cache.get(sus_player).members.map(m => m.user.username).length < 4) {
                  await message.reply('There are not enough players to start the game.');
                } else {
                  await message.reply('Preparing a new game of Among Us...');
                  console.log('Starting game prep');
      
                  // Get all members
                  const allPlayers = await message.guild.roles.cache.get(sus_player).members;
                  const nonBotMembers = await allPlayers.filter(member => !member.user.bot);
                  console.log('Fetched and filtered all members');
      
                  // Select new Imposter
                  console.log('Selecting new Imposter:');
                  const imposter = await nonBotMembers.random(); 
                  console.log(imposter.user.username);
      
                  // Assign Imposter role
                  await imposter.roles.remove(sus_crewmate);
                  await imposter.roles.add(sus_imposter);
                  currentImposter = imposter.user.id;
                  console.log('Imposter role assigned');
                  //await imposter.send('This bot is currently being alpha tested, please ignore these messages for the moment.\nYou are an Imposter.');
                  console.log(`Sent role DM to ${imposter.user.username}`);
      
                  // Assign crewmate to all other players
                  console.log('Assigning crewmates to all other players');
                  currentCrewmates = [];
                  await nonBotMembers.filter(member => member.user.id != imposter.user.id).forEach((member, i) => {
                    member.roles.remove(sus_imposter);
                    member.roles.add(sus_crewmate);
                    currentCrewmates.push(member.user.id);
                    console.log(`Assigned crewmate role to ${member.user.username}`);
                    //member.send('This bot is currently being alpha tested, please ignore these messages for the moment.\nYou are a Crewmate.');
                    console.log(`Sent role DM to ${member.user.username}`);
                    /*setTimeout(() => {
                      member.roles.remove(sus_imposter);
                      member.roles.add(sus_crewmate);
                      console.log(`Assigned crewmate role to ${member.user.username}`);
                    }, i * 1000);*/
                  });
                  // Start game
                  isGame = true;
                  await client.user.setPresence({status: 'dnd'});
                  await client.user.setActivity(`for Impostors`, { type: ActivityType.Watching });
                  // Announce that the game has begun
                  console.log('Announcing game start');
                  await client.channels.cache.get(channel).send(`<@&${'sus_player'}> A server-wide game of Among Us has started!`);
                }
                break;
            
            case 'stop':
                if (!admin.includes(message.author.id)) {
                  await message.reply('You do not have permission to use this command.');
                } else if (isGame) {
                  const stopMsg = await message.reply('Stopping the game...');
                  // Stop game
                  isGame = false;
                  await client.user.setPresence({status: 'online'});
                  await client.user.setActivity(`${prefix}help`, { type: ActivityType.Listening });
                  await stopMsg.edit('Game stopped.');
                } else {
                  await message.reply('There is no game currently running.');
                }
                break;

            case 'resetroles':
                if (!admin.includes(message.author.id)) {
                  await message.reply('You do not have permission to use this command.');
                } else {
                  // Remove game roles from all server members
                  console.log('Removing game roles from all server members');
                  const allMembers = await message.guild.members.fetch();
                  const nonBotMembers = await allMembers.filter(member => !member.user.bot);
                  await nonBotMembers.forEach((member, i) => {
                    member.roles.remove(sus_imposter);
                    member.roles.remove(sus_crewmate);
                    member.roles.remove(sus_player);
                    console.log(`Removed roles from ${member.user.username}`);
                  });
                  await message.reply('All game roles have been reset.');
                }
                break;
          
            case 'status':
                const statusPlayers = message.guild.roles.cache.get(sus_player).members.map(m => m.user.id).length;
                switch (isGame) {
                  case true:
                    await message.reply(`The game is currently running with ${statusPlayers} players.`);
                    break;
                  case false:
                    await message.reply(`The game is not currently running. ${statusPlayers} players are ready for a new round.`);
                    break;
                }
                break;
          
            case 'debug':
                if (!admin.includes(message.author.id)) {
                  await message.reply('You do not have permission to use this command.');
                } else {
                  await message.guild.members.fetch();
                }
                break;
            
            case 'help':
                await message.reply(`**Commands:**\n\n${prefix}ping - Pings the bot\n\n${prefix}start - Starts a server-wide game of Among Us\n\n${prefix}help - Shows this message`);
                break;
        }
    }
    if (isGame) {
      if (message.author.id == currentImposter) {
        console.log('Imposter message received: ' + message.content);
      } else if (currentCrewmates.includes(message.author.id)) {
        console.log('Crewmate message received: ' + message.content);
      }
    }
});

client.once('ready', () => {
  console.log('Bot is running!');
  client.user.setPresence({status: 'online'}); //sets initial presence
  client.user.setActivity(`${prefix}help`, { type: ActivityType.Listening }); //sets initial status
});

(async ()=>{
  const token = process.env['TOKEN'];
  if(!token) throw new Error('Invalid token');

  const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);

  if(!ratelimitTest.ok) {
    console.log('Rate limited')
    execSync('kill 1');
    return;
  };
  
  await client.login(token).catch((err) => {
    throw err
  });

  //await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });
})();