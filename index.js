require('express')().get('/', (_, t) => t.send('haii')).listen(6969, () => console.log('webserver created'));
const { glob } = require("glob"), { promisify } = require("util");
const globPromise = promisify(glob);
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32511 });
const Discord = require('discord.js');
const { ModalBuilder,TextInputBuilder, TextInputStyle,ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

client.cfg = new Object({
  prefix: '!',
  token: 'INSERT YOUR TOKEN HERE',
});

process.on("unhandledRejection", _ => console.error(_.stack + '\n' + '='.repeat(20)));

client.appCommands = new Collection();
module.exports = client;

client.login(client.cfg.token)
  .catch((e) => console.log(e));
client.on('ready', async () => {
  const guilds = new Array();

  
  await client.guilds.fetch().then((x) => x.map(
      ({ name, id }) => guilds.push(`${name} (ID: ${id})`)));
  console.log(
    `[Client-${client.user.username}] => Ready at`, 
    guilds
  );

  client.user.setStatus('idle');
  
  const ApplicationCommands = new Array();
  const ApplicationCommandsGlobPromise = await globPromise(`${process.cwd()}/commands/*.js`);
  for (let i = 0, x = ApplicationCommandsGlobPromise.length; i < x; ++i) {
    if (!require(ApplicationCommandsGlobPromise[i]).name) return;
    client.appCommands.set(
      require(ApplicationCommandsGlobPromise[i]).name,
      require(ApplicationCommandsGlobPromise[i])
    );
    if (["MESSAGE", "USER"].includes(require(ApplicationCommandsGlobPromise[i]).type))
      delete require(ApplicationCommandsGlobPromise[i]).description;
    ApplicationCommands.push(require(ApplicationCommandsGlobPromise[i]));
    console.log(`[Client-Application] => /${require(ApplicationCommandsGlobPromise[i]).name} - registered.`)
  };
  await client.application.commands.set(ApplicationCommands)
    .then(() => console.log('[Client-Application] => Registered all application commands.'));
});

client.on('messageCreate', async (message) => {
  const { prefix } = client.cfg;
  if (!(String(message.content).startsWith(String(prefix)))) return;
  const command = String(message.content).slice(String(prefix).length, String(message.content).length);

  if (command == 'ping')
    return message.reply({
      content: `Pong! (API: ${Math.round(client.ws.ping)}ms.)`,
    }).catch(() => null);
});

client.on('interactionCreate', async (interaction) => {
  const args = new Array();
  const currentCmd = client.appCommands.get(interaction.commandName);
  if (!currentCmd) {
    return interaction.reply({
      content: 'ERROR 001: Something\'s wrong with this command.'
    }).catch(() => null);
  }
  currentCmd.run(client, interaction, args);
});


//ping message

client.on('messageCreate', async message => {
    const prefix = '/'
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
       const embed = new EmbedBuilder()
      .setDescription(`Hi, <@${message.author.id}>!\nThis bot is using slash command!`)
          .setColor('#FFFFFF')
        return message.reply({ embeds: [embed]});
    }
})

