const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    } while (d2 - d < ms);
}

exports.run = async (client, message, args) => {
    try {
        let item = db.fetch(message.author.id, "Kazma")
        if (item) return message.channel.send("Zaten kazman var")
        let money = db.fetch(`money_${message.author.id}`)
        if (!args[0]) return message.channel.send("Ne almak istersin")
        if (args[0] == "kazma") {
            if (money < 1100) {
                return message.channel.send(`Yeterli paran yok, ${1100 - money} lira daha biriktirerek bunu alabilirsin.`)
            } else {
                db.push(message.author.id, "Kazma")
                db.subtract(`money_${message.author.id}`, 1100)
                message.channel.send("1000 liraya `Kazma`'yı aldın, %10 KDV ile ₺1100")

            }
        }

    } catch (e) {
        message.channel.send(e.message)
    }
}

exports.help = {
    name: "al",
    description: "Envanterinde ne olduğunu gör",
    usage: "b!envanter <kişi>",
    example: "b!envanter @cinoez#1881"
};

exports.conf = {
    aliases: ["buy", "satınal"],
    cooldown: 5
}