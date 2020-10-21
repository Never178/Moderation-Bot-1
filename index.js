const { Client, MessageAttachment, Collection, MessageEmbed } = require('discord.js');
const { PREFIX, TOKEN } = require('./config');
const bot = new Client({ disableMentions: 'everyone' });
const fs = require("fs");
const db = require('quick.db');

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 4, 
	kickThreshold: 5,
	banThreshold: 6,
	maxInterval: 5000, 
	warnMessage: '{@user}, Please stop spamming.', 
	kickMessage: '**{user_tag}** has been kicked for spamming.',
	banMessage: '**{user_tag}** has been banned for spamming.',
	maxDuplicatesWarning: 7,
	maxDuplicatesKick: 10, 
	maxDuplicatesBan: 12, 
	exemptPermissions: [ 'ADMINISTRATOR'], 
	ignoreBots: true, 
	verbose: true, 
	ignoredUsers: [],
});

bot.commands = new Collection();
bot.aliases = new Collection();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on('message', async message => {
    let prefix;
        try {

            antiSpam.message(message)
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
    try {
        
	
        if (message.mentions.has(bot.user) && !message.mentions.has(message.guild.id)) {
            return message.channel.send(`**My Prefix In This Server is - \`${prefix}\`**`)
        }
    } catch {
        return;
    };
});
bot.login(TOKEN);
