const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Github Repo")
    .setDescription("https://github.com/cinoez/shitbot-")
    .setColor(0xFFB900)
  message.channel.send(embed)
}

exports.help = {
  name: "sc",
  description: "Botun kodunun bulunduğu github dosyasını atar",
  usage: "b!sc",
  example: "b!sc"
}

exports.conf = {
  aliases: ["sourcecode"],
  cooldown: 5
}