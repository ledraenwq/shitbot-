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
      .catch((err) => console.log(err))
  }   else if (args[0] == "maks") {

    db.subtract(`money_${user.id}`, money);
    db.add(`bank_${user.id}`, money)
    message.channel.send(`${money} lirayı kasaya aktardım`)
  }else if (isNaN(args[0])) {
    return message.channel.send("Mal mısın amk sayı olmayan bir şeyi nasıl geri alıcan.")
  } else if (parseInt(args[0]) === NaN) {
    message.channel.send("Rakam olmayan bir şeyi nasıl kasalayabilirsin?")
    return;
  } else if (money === 0) {
    return message.channel.send('Cüzdanda o kadar para yok ab');
  } else if (member < args[0])
    return message.channel.send('Cüzdanda o kadar para yok ab');


 else {
    db.add(`bank_${user.id}`, args[0]);
    db.subtract(`money_${user.id}`, args[0]);
    message.channel.send(`${args[0]} lirayı kasaya aktardım`);
  }

};

exports.help = {
  name: 'kasala',
  description: 'Paranı güvenceye al',
  usage: 'b!kasala <miktar>',
  example: 'b!kasala 1500',
};

exports.conf = {
  aliases: ['kasa', 'banka'],
  cooldown: 5,
};