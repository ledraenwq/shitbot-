const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (bot, message, args) => {
    let kullandi = await db.fetch(`kullandi_${message.author.id}`)
    let user = message.author
    if(kullandi === 100) return message.channel.send("Zaten kontrol edilmişsin")
    else if(message.member.roles.cache.has('752912682767876187')) {
        let bağış = await db.fetch(`bagis_${user.id}`)
        await db.add(`bagis_${message.author.id}`, true)
        message.channel.send("Abo gerçekten 40 lira vermişsin, artık kazançlarını kullanabilirsin.")
        await db.add(`kullandi_${message.author.id}`, 100)
    } else {
       message.channel.send("Bağış yapmamışsın. https://www.patreon.com/shitposthizm buradan bağış yapabilirsin. Eğer yaptıysan bir kaç dakika bekle.") 
    }
}

exports.help = {
  name: "bağış",
  description: "Patreon'da bağış yaptıysan bu komutu kullan",
  usage: "b!bağış",
  example: "b!bağış"
};

exports.conf = {
  aliases: ["kontrol"],
  cooldown: 5
}