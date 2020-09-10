const Discord = require("discord.js");
const got = require("got")


exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/lesbians/random/.json').then((response) => {
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;
      let memeDownvotes = content[0].data.children[0].data.downs;
      let memeNumComments = content[0].data.children[0].data.num_comments;
      let titles = ["Lezbiyen = En iyisi", "Lesbian", "Girl on Girl:"]
      let title = titles[Math.floor(Math.random() * titles.length)]
      embed.setTitle(`${title}`);
      embed.setImage(memeImage);
      embed.setColor('RANDOM');
      embed.setFooter(`Görsel yoksa linke tıkla`);
      embed.setTimestamp
      message.channel.send(embed);
    });
  }else if(message.channel.nsfw === false) {
    message.channel.send("Burası NSFW kanalı değil amk sapığı")
  }
}

exports.help = {
  name: "lezbiyen",
  description: "Girl on girl fotosu atar",
  usage: "b!lezbiyen",
  example: "b!lezbiyen"
};

exports.conf = {
  aliases: ["lez", "lesbian"],
  cooldown: 3
}