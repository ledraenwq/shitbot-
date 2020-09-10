const Discord = require("discord.js");
const got = require("got")
const db = require("quick.db")
let {
  default_prefix
} = require("../../config.json")

exports.run = async (bot, message, args) => {

  if (message.channel.nsfw === true) {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/ass/random/.json').then((response) => {
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let titles = ["Butts", "Yummy", "Göt:yum:"]
      let title = titles[Math.floor(Math.random() * titles.length)]
      embed.setTitle(`${title}`);
      embed.setImage(memeImage);
      embed.setURL(memeUrl)
      embed.setColor('RANDOM');
      embed.setFooter(`Görsel yoksa linke tıkla`);
      embed.setTimestamp()
      message.channel.send(embed);
    });
  } else if (message.channel.nsfw === false) {
    message.channel.send("Burası NSFW kanalı değil amk sapığı")
  }
}

exports.help = {
  name: "ass",
  description: "Kalça fotosu atar",
  usage: "b!ass",
  example: "b!ass"
};

exports.conf = {
  aliases: ["göt", "kalça"],
  cooldown: 3
}