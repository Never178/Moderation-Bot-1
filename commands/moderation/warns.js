const warns = require("../../warns");
const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {

  name: "warns",
  description: "Get a user's warns in the guild!",
  category: "moderation",
  usage: "<User mention>",
        accessableby: "Moderators",
        },
  run: async (bot, message, args) => {
    if(args[0] == 'help') {
    let helpembed = new MessageEmbed()
    .setTitle('Warns command info') 
    .setDescription(`${module.exports.description}`)
    .addField('Usage', `!warns [@user]`)
    .addField('Category', `Moderation`)
    .setColor("RANDOM")
    return message.channel.send(helpembed)
    }
    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`No user specified!`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(
            `${user.user.tag} has not got any warns in this guild!`
          );
        let Embed = new MessageEmbed()
          .setTitle(`${user.user.tag}'s warns in ${message.guild.name}.. `)
          .setDescription(
            data.map((d) => {
              return d.Warns.map(
                (w, i) =>
                  `${i} - Moderator: ${
                    message.guild.members.cache.get(w.Moderator).user.tag
                  } Reason: ${w.Reason}`
              ).join("\n");
            })
          );
        message.channel.send(Embed);
      }
    );
  },
};
