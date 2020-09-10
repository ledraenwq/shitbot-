const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")
const default_prefix = config.default_prefix

exports.run = async (client, message, args) => {
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = default_prefix;

  if (!args[0]) {
    let module = client.helps.array();

    if (!client.config.owners.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setDescription(`Komut hakkında detaylı bilgi için \`${prefix}yardım [komut]\` yaz.`)
      .setTitle("Yardım")

    for (const mod of module) {
      embed.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join(" | "));
    }

    return message.channel.send(embed);
  } else {
    let cmd = args[0];


    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = command.help.name;
      let desc = command.help.description;
      let cooldown = `\`${command.conf.cooldown } saniye\``;
      let aliases = command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "Alt komut bilgisi verilmemiş";
      let usage = command.help.usage ? command.help.usage : "Kullanım bilgisi verilmemiş";
      let example = command.help.example ? command.help.example : "Örnek kullanım verilmemiş";

      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(name)
        .setDescription(desc)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter("[] isteğe bağlı, <> zorunlu. Bu sembolleri gerçek komut yazarken kullanma")
        .addField("Bekleme süresi", cooldown)
        .addField("Alternatif komutlar", `\`${aliases}\``, true)
        .addField("Kullanım", `\`${usage}\``, true)
        .addField("Örnek", `\`${example}\``, true)

      return message.channel.send(embed);
    } else {
      return message.channel.send("Böyle bir komut yok :D?");
    }
  }
}

exports.help = {
  name: "help",
  description: "Yardım mesajı atar.",
  usage: "b!help [komut]",
  example: "b!help çocuk"
};

exports.conf = {
  aliases: ["yardım", "komutlar"],
  cooldown: 7.5
}