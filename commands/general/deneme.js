const Discord = require("discord.js")
const db = require("quick.db")
let msg;

exports.run =  (bot, message, args) => {
  message.channel.send("`A`")
  }

exports.help = {
  name: "deneme",
  description: "deneme",
  usage: "b!deneme",
  example: "b!deneme"
};

exports.conf = {
  aliases: [],
  cooldown: 5
}