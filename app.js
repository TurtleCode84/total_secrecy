const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Routes, GatewayIntentBits, ActivityType, Commands } = require('discord.js');
const prefix = 't!';

const sus_crewmate = '1203737581984948335';
const sus_imposter = '1203741209714106408';

const ping = {
  name: 'ping',
  description: 'Pings the bot'
};

const sus = {
  name: 'sus',
  description: 'Starts a server-wide game of Among Us'
}

const say = {
  name: 'say',
  description: 'Makes the bot repeat whatever your specify',
  options: [
    {
      name: 'message',
      description: 'The message to repeat',
      type: 3,
      required: true
    }
  ]
}

const help = {
  name: 'help',
  description: 'Shows a list of available commands'
}

const commands = [ping, sus, say, help];

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


client.on('interactionCreate', async (interaction) => {
  switch(interaction.commandName) {
    case 'ping':
      await interaction.reply(`Pong! The round trip took ${Date.now() - interaction.createdTimestamp}ms.`);
      break;
    case 'sus':
      await interaction.reply('Preparing a new game of Among Us...');
      console.log('Starting game prep');
      
      // Get all members
      const allMembers = await interaction.guild.members.fetch();
      const nonBotMembers = await allMembers.filter(member => !member.user.bot);
      console.log('Fetched and filtered all members');
      
      // Select new Imposter
      console.log('Selecting new Imposter:');
      const imposter = await nonBotMembers.random(); 
      console.log(imposter.user.username);
      
      // Assign Imposter role
      await imposter.roles.remove(sus_crewmate);
      await imposter.roles.add(sus_imposter);
      console.log('Imposter role assigned');
      
      // Assign crewmate to all other server members
      console.log('Assigning crewmates to all other members');
      await nonBotMembers.filter(member => member.user.id != imposter.user.id).forEach((member, i) => {
        member.roles.remove(sus_imposter);
        member.roles.add(sus_crewmate);
        console.log(`Assigned crewmate role to ${member.user.username}`);
        /*setTimeout(() => {
          member.roles.remove(sus_imposter);
          member.roles.add(sus_crewmate);
          console.log(`Assigned crewmate role to ${member.user.username}`);
        }, i * 1000);*/
      });
      // Announce that the game has begun
      console.log('Announcing game start');
      await interaction.channel.send(`${interaction.guild.roles.everyone} A server-wide game of Among Us has started!`);
      break;
    case 'say':
      console.log(interaction.options.get('message'));
      if (interaction.options.get('message').value.length > 0)
        await interaction.reply(interaction.options.get('message').value);
      else
        await interaction.reply('You did not specify a message to repeat.');
      break;
    case 'help':
      await interaction.reply('**Commands:**\n\n`/ping` - Pings the bot\n\n`/sus` - Starts a server-wide game of Among Us\n\n`/say` - Makes to bot say whatever you want\n\n`/help` - Shows this message');
      break;
  }
});

/*client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift();
        switch (command) {
            case 'ping':
                const msg = await message.reply('Pinging...');
                await msg.edit(`Pong! The round trip took ${Date.now() - msg.createdTimestamp}ms.`);
                break;
            case 'say':
            case 'repeat':
                if (args.length > 0)
                    await message.channel.send(args.join(' '));
                else
                    await message.reply('You did not send a message to repeat, cancelling command.');
                break;
            case 'help':
                await message.reply('**Commands:**\n\nt!ping - Pings the bot\n\nt!say (or t!repeat) - Makes to bot say whatever you want\n\nt!help - Shows this message');
                break;
        }
    }
});*/

client.once('ready', () => {
  console.log('TurtleBot is running!');
  client.user.setPresence({status: 'online'}); //sets presence
  client.user.setActivity(`for Imposters`, { type: ActivityType.Watching }); //sets activity
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

  await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });
})();