const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

exports.run = async (bot, message, args) => {
  let user = message.author;

  let member = db.fetch(`money_${user.id}`);
  let member2 = db.fetch(`bank_${user.id}`);

  let money = await db.fetch(`money_${user.id}`);
  let bank = await db.fetch(`bank_${user.id}`);

  if (!args[0]) {
    return message.channel
      .send('Ne kadar parayı geri alacağımı bilmiyorum')
      .catch((err) => console.log(err));
  } else if (args[0] == "maks") {

    message.channel.send(`${bank} lirayı cüzdana aktardım`)
    db.add(`money_${user.id}`, bank);
    db.subtract(`bank_${user.id}`, bank)
  }else if (isNaN(args[0])) {
    return message.channel.send("Mal mısın amk sayı olmayan bir şeyi nasıl geri alıcan.")
  } else if (bank === 0) {
    return message.channel.send('Kasanda o kadar para yok ab');
  } else if (member2 < args[0])
    return message.channel.send('Kasanda o kadar para yok ab');


   else {
    db.subtract(`bank_${user.id}`, args[0]);
    db.add(`money_${user.id}`, args[0]);
    message.channel.send(`${args[0]} lirayı cüzdana aktardım`);
  }
};

exports.help = {
  name: 'gerial',
  description: 'Paranı kasadan çıkar',
  usage: 'b!gerial <miktar>',
  example: 'b!gerial 1500',
};

exports.conf = {
  aliases: ['withdraw', 'geri'],
  cooldown: 5,
};