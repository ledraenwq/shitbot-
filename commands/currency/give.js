const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

exports.run = async (bot, message, args) => {

  let user = message.mentions.members.first() || message.author

  if (message.author.id == "697337494571712576") {
    db.add(`money_${user.id}`, args[0])
    message.channel.send(`${args[0]} lirayı ${user}'ye gönderdim `)
  } else {
    return message.channel.send("Aga sen botun sahibi misin?")
  }

}


exports.help = {
  name: "ver",
  description: "Sadece botun sahibi kullanabilir",
  usage: "",
  example: ""
};

exports.conf = {
  aliases: ["add"],
  cooldown: ""
}