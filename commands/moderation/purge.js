const Discord = require("discord.js")
const db = require("quick.db")
const {
  default_prefix
} = require("../../config.json")

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}


exports.run = async (client, message, args) => {
  try {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send("Bu komutu kullanmaya iznin yok<:uzucu:725952785048272927>")
      message.delete(5000)
    }


    if (!args[0]) {
      message.channel.send("Ne kadar mesaj sileceğimi belirtmemişsin.")
      message.delete(5000)
    }

    if (args[0] > 100) return message.channel.send("100 mesajdan fazla silemiyorum")
    else {
      message.delete()
      let deleted = await message.channel.bulkDelete(args[0])
      const embed = new Discord.MessageEmbed()
        .setTitle("Başarılı<a:eved:731535910654705734>")
        .setDescription(`${deleted.size} mesaj silindi`)
        .setColor("GREEN")
        .setTimestamp()
      let msg = await message.channel.send(embed)
      wait(5000)
      msg.delete()


    }
  } catch (e) {
    message.channel.send("Yo")
  }
}

exports.help = {
  name: "purge",
  description: "Mesaj silme komutu",
  usage: "b!purge <miktar>",
  example: "b!purge 69"
};

exports.conf = {
  aliases: ["sil", "clear"],
  cooldown: 7.5
}