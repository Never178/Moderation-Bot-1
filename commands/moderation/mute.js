const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const db = require('quick.db')


module.exports =  {
    config: {
    name: "mute",
    aliases: ["m"],
    category: "Moderation",
    description: "Mutes the user for a certain amount of time, if no time is submitted the user will be muted for 10 minutes. Make sure the Muted role is above all the roles, or above the highest role of the member you want to mute.",
    usage: "!mute <time(s,m,h,d)> <Reason>",
    permission: "Kick Members",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) =>{
      if(args[0] == 'help') {
        let helpembed = new Discord.MessageEmbed()
        .setTitle('Mute command info')
        .setDescription(`${module.exports.description}`)
        .addField('Usage', `${module.exports.usage}`)
        .addField('Permission', `${module.exports.permission}`)
        .addField('Category', `${module.exports.category}`)
        .setColor("RANDOM")
        return message.channel.send(helpembed)
      }
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have enough permissions.").then(msg => msg.delete({timeout: 10000}));
    const mod = message.author;

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!user) return message.channel.send("Mention the user you want to mute.");
    const roleA = message.member.roles.highest;
    const roleB = user.roles.highest;
    if(roleA.comparePositionTo(roleB) <= 0 )
            return message.channel.send("This member has a higher or equal role than you!");

    let time = message.content.split(" ").slice(2,3).join(" ");
    if (!time) {
        time = "10m";
    }

    let reason = args.slice(2,24).join(" ");
    if(!reason) {
        return message.channel.send("You must provide a reason!").then(msg => msg.delete({timeout: 15000}));
    }

    let modlogchannel = db.fetch(`modlog_${message.guild.id}`)
        let muteEmbed = new Discord.MessageEmbed()
        .setColor("#870000")
        .setDescription('User Muted')
        .addField('Muted user', `${user.user.tag} - ID: ${user.id}`)
        .addField("Muted By", `${mod} - ID: ${mod.id}`)
        .addField('Time', `${time}`)
        .addField('Reason', `${reason}`);
  

    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if(!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          data: {
            name: "Muted",
            color: "#514f48",
            permissions: []
          }
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    message.guild.channels.cache.forEach((channel) => {
      channel.updateOverwrite(muteRole, {
        "SEND_MESSAGES": false,
        "ATTACH_FILES": false,
        "SEND_TTS_MESSAGES": false,
        "ADD_REACTIONS": false,
        "SPEAK": false,
        "STREAM": false
      })},
    )


  user.roles.add(muteRole.id);
    message.channel.send(muteEmbed);
  let mdSend = message.guild.channels.cache.get(modlogchannel)
  if(!modlogchannel) return message.channel.send('This mute was not logged as mod-logs channel is not setup, make sure to set a channel as a mod-log channel using `setmodlogch` command.')
  if(!mdSend) return
 mdSend.send(muteEmbed)

    setTimeout(function(){
      if(!user.roles.cache.has(muteRole.id)) return
      let dmEmbed2 = new Discord.MessageEmbed()
      .setDescription(`***You've been unmuted in ${message.guild.name}***`)
      .setColor("GREEN")
        user.roles.remove(muteRole.id)
        user.send(dmEmbed2)
     let sChannel = message.guild.channels.cache.get(modlogchannel)
     if(!sChannel) return;
     sChannel.send(`<@${user.id}> has been unmuted.`)
      if(!modlogchannel) return ('This mute was not logged as mod-logs channel is not setup, make sure to set a channel as a mod-log channel using `setmodlogchannel` command.')
    }, ms(time))

    let dmembed = new Discord.MessageEmbed()
    .setDescription(`***You have been muted in '${message.guild.name}, for ${time}. Reason: ${reason}.***`)
    .setColor("GREEN")
return user.send(dmembed)
  }};