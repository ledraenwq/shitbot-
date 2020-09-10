const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
  let tag = "1881"
  let user = message.mentions.members.first() || message.author;

  let money = await db.fetch(`money_${user.id}`);
  if (money === null) money = 0;

  if (user.bot) {
    message.channel.send("Botlar para sistemini kullanamaz");
  } else {
    let bank = db.fetch(`bank_${user.id}`);
    if (bank === null) bank = 0;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Durum gösterme`)
      .addField(`Paraların sahibi`, `${user}`)
      .addField(`Cüzdan:`, money, true)
      .addField(`Kasa:`, bank, true)
      .addField(`Toplam`, money + +bank, true)
      .setTimestamp()
      .setFooter(`cinoez#1881'i geçebilecek varsa bana dm atsın😎`)
      .setColor("RANDOM");
    message.channel.send(embed);
  }
};

exports.help = {
  name: "cüzdan",
  description: "Ne kadar paranız olduğunu gösterir",
  usage: "b!cüzdan [kişi]",
  example: "b!cüzdan @cinoez#3169",
};

exports.conf = {
  aliases: ["para", "bal", "cüz"],
  cooldown: 5,
};