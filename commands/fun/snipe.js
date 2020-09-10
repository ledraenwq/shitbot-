const Discord = require("discord.js");
const got = require("got")
const talkedRecently = new Set();
const db = require("quick.db")


exports.run = async (bot, message, args) => {
  let data = db.get(`snipe.${message.guild.id}`)
  if (!data) {
    return message.channel.send("Belli zaman içerisinde kimse mesaj silmemiş :(")
  } else {
    let content = data.content,
      user = data.user,
      channel = data.channel;

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user} ifşa`)
      .setTimestamp
      .setColor("RANDOM")
      .setDescription(`\`${user}\` \`<#${channel}>\`'da **${message}** mesajını silmiş:flushed:`)
  }
}

exports.help = {
  name: "ifşa",
  description: "Son silinen mesajı kim tarafından atıldığını ve içeriğini atar",
  usage: "b!pp [kişi]",
  example: "b!pp @cinoez#9999"
};

exports.conf = {
  aliases: ["peepee", "penis"],
  cooldown: 1
}