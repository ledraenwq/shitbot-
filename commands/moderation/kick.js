const Discord = require("discord.js")
const db = require("quick.db")
const {
  default_prefix
} = require("../../config.json")



exports.run = async (bot, message, args) => {
    try {
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "Neden verilmemiş"
    
    if(!message.member.hasPermission("KICK_MEMBERS")) 
    return message.channel.send("Bu komutu kullanmaya iznin yok<:uzucu:725952785048272927> ")

    
    
    let user = message.mentions.members.first()
    if (!user) {
    return message.channel.send("Kimi atayım")
    } else { 
        user.kick(reason)
        let embed = new Discord.MessageEmbed()
        .setTitle("Atma başarılı<a:eved:731535910654705734>")
        .addField("Atılan kişi", user, true)
        .addField("Neden:", reason)
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(embed)
    }
  } catch {
      message.channel.send(e.message)
  }  
}


exports.help = {
  name: "at",
  description: "Bir kişiyi serverdan at",
  usage: `b!at <kişi> [sebep]`,
  example: `b!at @cinoez#1881 piçlik yapma😉`
};

exports.conf = {
  aliases: ["kick"],
  cooldown: 7.5
}