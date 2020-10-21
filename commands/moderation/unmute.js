const {  Discord, MessageEmbed } = require("discord.js")
const fs = require("fs");
const db = require('quick.db')



module.exports =  {
    config: {
    name: 'unmute',
    aliases: ["speak"],
    description: 'This will allow the muted user to speak.',
    usage: 'unmute <user>',
    category: "Moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) =>{
      
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have permission to use this command.");

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "KICK_MEMBERS"])) return message.channel.send("I don't have permission to add roles!")
   

    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!mutee) return message.channel.send("Please supply a user to be unmuted!");

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
    if(!muterole) return message.channel.send("There is no mute role to remove!")


    mutee.roles.remove(muterole.id).then(() => {
      let dmembed = new MessageEmbed()
      .setDescription(`You've been unmuted in ${message.guild.name}`)
      .setColor("GREEN")
        mutee.send(dmembed).catch(err => console.log(err))
        message.channel.send(`:white_check_mark: <@${mutee.id}> was unmuted!`)
    })
    const muteEmbed = new MessageEmbed()
        .setDescription("User unmuted")
        .setColor('#870000')
        .addField("Moderator", `${message.author} - ID: ${message.author.id}`)
        .addField("User", `${mutee} - ID: ${mutee.id}`)
        .addField("Removed In", `${message.channel}`)

    let warnchannel = db.fetch(`modlog_${message.guild.id}`)
    if(!warnchannel) return message.channel.send('This unmute was not logged as mod-logs channel is not setup, make sure to set a channel as a mod-log channel using `setmodlogchannel` command.')
    let sChannel = message.guild.channels.cache.get(warnchannel)
    if(!sChannel) return;
    sChannel.send(muteEmbed)

  }};