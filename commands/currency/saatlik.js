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
  let timeout = 3600000

  function btw(min, max) {
    Math.floor(Math.random() * min - max) + 1
  }

  let amount = 250


  let hourly = await db.fetch(`hour_${message.author.id}`);

  if (hourly != null && timeout - (Date.now() - hourly) > 0) {
    let time = ms(timeout - (Date.now() - hourly))

    let msg = await message.channel.send(`Zaten saatlik harçlığını topladın, **${time.minutes}dk ${time.seconds}sn** içinde geri gel`)
  } else {
    db.add(`money_${message.author.id}`, amount)
    db.set(`hourly_${message.author.id}`, Date.now())

    let money = await db.fetch(`money_${message.author.id}`)
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Günlük harçlık`, message.author.displayAvatarURL)
      .setColor("GREEN")
      .addField("Verilen para", amount, true)
      .addField("Cüzdandaki güncel para", `₺${money}`, true)
    message.channel.send(embed)


  }
}

exports.help = {
  name: "saatlik",
  description: "Saatte bir harçlık ",
  usage: "b!saatlik",
  example: "b!saatlik"
};

exports.conf = {
  aliases: ["hourly"],
  cooldown: 5
}