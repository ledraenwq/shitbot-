const Discord = require("discord.js");
const got = require("got")
const slots = ["💰", "😳", "💩"]
const db = require("quick.db")


exports.run = async (bot, message, args) => {

  let slot1 = slots[Math.floor(Math.random() * 3)]
  let slot2 = slots[Math.floor(Math.random() * 3)]
  let slot3 = slots[Math.floor(Math.random() * 3)]

  let para = args[0] * 5
  let kaybedilenPara = args[0]

  let money = db.fetch(`money_${message.author.id}`)
  let bank = db.fetch(`bank_${message.author.id}`)



  if (args[0] < 100) return message.channel.send("100'den az para yatıramazsın")
  else if (money < kaybedilenPara) return message.channel.send("Yeterli paran yok")
  else if (!args[0]) return message.channel.send("Ne kadar parayı riske atmak istiyorsun")
  else if (isNaN(args[0])) return message.channel.send("Mal mısın amk sayı olmayan bir şeyi nasıl kumara yatırcan.")
  else if (money = 0) return message.channel.send("Yeterli paran yok")


  if (slot1 === slot2 && slot1 === slot3) {

    db.add(`money_${message.author.id}`, para)
    const embed = new Discord.MessageEmbed()
      .setTitle("Yihoo kazandın")
      .addField("Kazanılan para:", para)
      .addField("Sonuç", `${slot1}${slot2}${slot3}`)
      .setColor([0, 255, 0])
    message.channel.send(embed)

  } else {

    db.subtract(`money_${message.author.id}`, kaybedilenPara)
    db.add(`money_${"697337494571712576"}`, kaybedilenPara)
    const embed = new Discord.MessageEmbed()
      .setTitle("Kaybettin :( ")
      .addField("Kaybedilen para:", kaybedilenPara)
      .addField("Sonuç:", `${slot1}${slot2}${slot3}`)
      .setColor([255, 0, 0])
    message.channel.send(embed)


  }



}

exports.help = {
  name: "kumar",
  description: "Kumar✌",
  usage: "b!kumar",
  example: "b!kumar"
};

exports.conf = {
  aliases: ["slots"],
  cooldown: 5
}