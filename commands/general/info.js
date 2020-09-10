const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let avatar = bot.user.displayAvatarURL()

  const embed = new Discord.MessageEmbed()
    .setTitle("Bot bilgisi")
    .addField("Bot adı", bot.user.username, true)
    .addField("Server adı", message.guild.name, true)
    .addField("Server sayısı", bot.guilds.cache.size)
    .addField("RAM kullanımı", `RAM: ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)} GB`, true)
    .addField("Bot sahibi", "cinoez", true)

    .setThumbnail(avatar)
    .setColor("RANDOM")
  message.channel.send(embed)
}

exports.help = {
  name: "info",
  description: "Bot hakkında genel bilgi verir",
  usage: "b!info",
  example: ""
}

exports.conf = {
  aliases: ["bilgi"],
  cooldown: 5
}