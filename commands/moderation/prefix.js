const Discord = require("discord.js")
const db = require("quick.db")
const {
  default_prefix
} = require("../../config.json")


exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send("Bu komutu kullanmaya iznin yok<:uzucu:725952785048272927>")
  if (!args[0])
    return message.channel.send("Prefix ne olsun ab?")
  if (args[1])
    return message.channel.send("Bir prefixte boşluk kullanamazsın")
  if (args.lenght > 4)
    return message.channel.send("Aga beş haneli prefix çok abartı değil mi?")

  if (args.join("") === default_prefix) {
    db.delete(`prefix_${message.guild.id}`)
    return await message.channel.send("Varsayılan prefixe geri dönüldü")
  }

  db.set(`prefix_${message.guild.id}`, args[0])
  const embed = new Discord.MessageEmbed()
    .setTitle("Başarı!")
    .setDescription(`Prefix başarı ile ${args[0]}'a değiştirildi <a:eved:731535910654705734>`)
    .setColor(0x00FF7C)
  await message.channel.send(embed)

}

exports.help = {
  name: "prefix",
  description: "Sadece 'Serverı Yönet' izni olan kişiler sadece komutun yazıldığı serverda 'prefix'i değiştirir",
  usage: "b!prefix <prefix>",
  example: "b!prefix sb!"
};

exports.conf = {
  aliases: [],
  cooldown: 7.5
}