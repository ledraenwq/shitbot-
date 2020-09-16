const Discord = require("discord.js");
const got = require("got")
const db = require("quick.db")
const talkedRecently = new Set();


exports.run = async (bot, message, args) => {


  let desc = "**peepee size machine<:pepeoha:725969290754523166>** \nEşya - 6900"
  let item = db.get(message.author.id)

  if (item.includes(desc)) {
    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }



    let chance = Math.ceil(Math.random() * 10);

    if (user.bot) {
      const botembed = new Discord.MessageEmbed()
        .setTitle("peepee size machine")
        .setDescription(`${user}'ın yarrağı 169 cm`)
        .setColor("RANDOM")
      const msgs = await message.channel.send(botembed)
      msgs.react("😳")



    } else {
      if (chance === 1) {
        const embedlol = new Discord.MessageEmbed()
          .setTitle('peepee size machine')
          .setDescription(`D-dostum ${user}'ın yarrağının boyu ölçülemeyecek kadar küçük`)
          .setColor('RANDOM');
        const m = await message.channel.send(embedlol);
        m.react('🅱').then((r) => {
          m.react('🇷').then((rea) => {
            m.react('🇺').then((rac) => {
              m.react('🇭');
            });
          });
        });
      } else {
        const embed = new Discord.MessageEmbed()
          .setTitle('peepee size machine')
          .setDescription(
            `${user} yarrağı ${Math.floor(
            Math.random() * 100
          )} cm`
          )
          .setColor('RANDOM');
        const msg = await message.channel.send(embed);
        msg.react('😳');
      }
    }
  } else {
    message.channel.send("peepee size machine'e sahip değilsin")
  }
}

exports.help = {
  name: "pp",
  description: "Cinsel penisinin boyunu söyler",
  usage: "b!pp [kişi]",
  example: "b!pp @cinoez#9999"
};

exports.conf = {
  aliases: ["peepee", "penis"],
  cooldown: 1
}