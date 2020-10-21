# Moderation-Bot
A v12 discord.js moderation bot with some autmod features (anti-spam)

## Installation and Config ##
1) Clone this repo either by downloading the zip or by cloning it using git.
2) Make a new file called `config.js`, then include your token and prefix. Here's an example:

```
exports.TOKEN = "your bot token", //your discord bot token
exports.PREFIX = "," //your bots prefix
```
3) Type `npm i`.
4) Type `node index.js`.
5) Wait for the console to say <Bot name> is now online.

## Hosting ##
1) **Please do not use heroku to host your bot, this code uses quick.db to store data, heroku deletes all the data upon restarting.** If you want to host your discord bot, consider checking out [DanBot Hosting](https://discord.com/invite/j5EnRwT), DanBot Hosting allows you to host your discord bots and game servers for free. 


### Credits ###
The code here is based on FirezTheGreat's bot [1Shot](https://github.com/FirezTheGreat/1SHOT), however some changes have been made to the code. 
