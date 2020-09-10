const Discord = require("discord.js");


exports.run = async (bot, message, args) => {
  function one() {
    message.channel.send(
      'NO SCAM FREE ROBUX!! AND NO VIRUS HALAL CHİLD PORN LİNK🕋🤲📿 ```js\n"https://youtu.be/dQw4w9WgXcQ"``` \n😁😁🤭roblox uc مجاني والمواد الإباحية الحلال للأطفال 🤲📿'
    )
  }

  function two() {
    message.channel.send("COPY LINK AND PASTE IS ON GOOGLE!!😁😁🤭")
  }
  message.react("🕋")

  one()
  setTimeout(two, 3500)
}

exports.help = {
  name: "child",
  description: "Çocuk pornosu mu:flushed:",
  usage: "b!child",
  example: "b!child"
};

exports.conf = {
  aliases: ["çocuk", "arab"],
  cooldown: 5
}