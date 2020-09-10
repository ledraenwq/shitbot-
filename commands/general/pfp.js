const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user;

  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }

  let avatar = user.displayAvatarURL({
    size: 4096,
    dynamic: true
  });

  const embed = new Discord.MessageEmbed()
  .setImage(avatar)
  .setColor("RANDOM")
  .setTitle(`Avatar machine`)
  .setDescription(`${user} avatar`)
  .setTimestamp()

  return message.channel.send(embed);
}

exports.help = {
  name: "pfp",
  description: "Bir kullanıcının ppsini görün",
  usage: "avatar [@kullanıcı | Kullanıcı ID]",
  example: "avatar @cinoez#0866\navatar"
}

exports.conf = {
  aliases: ["ikon", "avatar", "ava"],
  cooldown: 5
}