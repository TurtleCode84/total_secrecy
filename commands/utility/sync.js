const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sync')
    .setDescription('Sync all commands with Discord')
    .setDMPermission(false),
  async execute(interaction) {
    if (!interaction.member.roles.cache.find(r => r.id === botInfo.adminRole)) {
      await interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true});
      return;
    }

    const commands = await interaction.client.application.commands.fetch();
    const kool = await interaction.client.application.commands.set(commands);
    if (kool.size > 0) {
      await interaction.reply({content: 'Commands synced successfully!', ephemeral: true});
    } else {
      await interaction.reply({content: 'Commands failed to sync!', ephemeral: true});
    }
  },
};