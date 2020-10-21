const { PREFIX } = require('../../config');
const mongoose = require('mongoose')
module.exports = async bot => {
    mongoose.connect(

  "mongodb+srv://username:password@cluster0.e0cnl.mongodb.net/<dbname>?retryWrites=true&w=majority", //your mongo dB url

  { useNewUrlParser: true, useUnifiedTopology: true }

);
    console.log(`${bot.user.username} is now online!`)
    let totalUsers = bot.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
    var activities = [ `${bot.guilds.cache.size} servers`, `${totalUsers} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${PREFIX}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),5000)
    
};
