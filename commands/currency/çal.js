const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}

exports.run = async (bot, message, args) => {

  let user;

  if (message.mentions.users.first()) {
    user = message.mentions.users.first()
    if (user.id === "697337494571712576") return message.channel.send("Botun sahibini soyamazsın")
    else if (user.bot) {
      message.channel.send("BOTLARA DESTEK BOTLARI SOYAMAZSIN!")
    } else {
      let money = db.fetch(`money_${user.id}`)
      let authorMoney = db.fetch(`money_${message.author.id}`)
      let steal = Math.round(Math.random() * money)
      if (steal < 1000) {
        let kalan = 1000 - steal
        steal = steal + kalan
      }
      if (money < 1000) return message.channel.send("1000 liranın altında kişiyi soymaya ne gerek var?")
      else if (authorMoney < 2000) return message.channel.send("Paran 2000 liranın altında olduğu için hırsızlık yapamazsın")
      else {
        let chance = Math.ceil(Math.random() * 15)
        if (chance === 1) {
          db.subtract(`money_${message.author.id}`, 2000)
          message.channel.send("Hehe ters tepti 2000 lira kaybettin")
        } else {
          db.add(`money_${message.author.id}`, steal)
          db.subtract(`money_${user.id}`, steal)
          let embed = new Discord.MessageEmbed()
            .setTitle("Soyma başarılı")
            .addField("Soyulan kişi:", user, true)
            .addField("Alınan para", steal, true)
            .setTimestamp()
            .setFooter("Piç hayatını mahvettin adamın😡")
            .setColor("RANDOM")
          message.channel.send(embed)
        }
      }
    }
  } else {
    return message.channel.send("Kimi soyup hayatını mahvetmek istersin?")
  }
}

exports.help = {
  name: "soy",
  description: "Birinden para çal",
  usage: "b!soy <kişi>",
  example: "b!soy @cinoez#9999"
};

exports.conf = {
  aliases: ["çal"],
  cooldown: 5
}