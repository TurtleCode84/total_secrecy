const { SlashCommandBuilder } = require('discord.js');
const { botInfo } = require('../../lib/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.')
    .setDMPermission(false),
  async execute(interaction) {
    const bot = await botInfo();
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(`This command was run by ${interaction.user.username}, who is ${interaction.member.roles.cache.some(r => r.id === bot.adminRole) ? 'an' : 'not an'} admin.`);
  },
};