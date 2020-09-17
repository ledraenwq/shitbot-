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

exports.run = async (bot, message, args) => {

    let user;

    if (message.mentions.users.first()) {
        user = message.mentions.users.first()
        if (user.id === "697337494571712576") return message.channel.send("Botun sahibini soyamazsın")
        else if (user.bot) {
            message.channel.send("BOTLARA DESTEK BOTLARI SOYAMAZSIN!")
        } else {
            let money = db.fetch(`bank_${user.id}`)
            let authorMoney = db.fetch(`money_${message.author.id}`)
            let steal = Math.round(Math.random() * money)
            if (steal < 1000) {
                let kalan = 1000 - steal
                steal = steal + kalan
            }
            if (money < 15000) return message.channel.send("15k liranın altında para saklayan bir malı soymaya ne gerek var?")
            else if (authorMoney < 150000) return message.channel.send("Paran 150k liranın altında olduğu için soygun yapamazsın")
            else {
                let chance = Math.ceil(Math.random() * 20)
                if (chance < 19) {
                    db.delete(`money_${message.author.id}`)
                    db.delete(message.author.id)
                    message.channel.send("Polislere yakalandın ve bütün paranı ve çantanı aldılar")
                } else {
                    db.add(`money_${message.author.id}`, steal)
                    db.subtract(`bank_${user.id}`, steal)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("Banka kırma başarılı")
                        .addField("Soyulan kişi:", user, true)
                        .addField("Alınan para", steal, true)
                        .setTimestamp()
                        .setFooter("Piç hayatını mahvettin adamın😡")
                        .setColor("RANDOM")
                    message.channel.send(embed)
                }
            }
        }
    } else {
        return message.channel.send("Kimin kasasını kıracaksın?")
    }
}

exports.help = {
    name: "soygun",
    description: "Birinden para çal",
    usage: "b!soy <kişi>",
    example: "b!soy @cinoez#9999"
};

exports.conf = {
    aliases: ["bankrob"],
    cooldown: 120
}