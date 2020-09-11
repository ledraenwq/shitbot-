const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")
const default_prefix = config.default_prefix
const fs = require("fs")

const items = JSON.parse(fs.readFileSync("items.json", "utf8"))

exports.run = async (client, message, args) => {
    let money = db.fetch(`money_${message.author.id}`)
    try {
        let itemName = ""
        let itemPrice = 0
        let itemDesc = ""

        for (let i in items) {
            if (args.join(" ").trim().toLowerCase() === items[i].ad.toLowerCase()) {
                itemName = items[i].ad;
                itemPrice = parseInt(items[i].fiyat);
                itemDesc = items[i].açıklama;
            }
        }
        let KDV = itemPrice * 10 / 100
        let KDVDahil = itemPrice + KDV
        if (itemName === "")
            return message.channel.send("OLMAYAN BİR ŞEYİ NASIL ALACAKSIN???")
        if (money < KDVDahil)
            return message.channel.send(`Yeterli paran yok, ${KDVDahil - money} daha biriktirmen gerek<:uzucu:725952785048272927>`)

        db.subtract(`money_${message.author.id}`, KDVDahil)
        message.channel.send(`${itemPrice} liraya \`${itemName}\` aldın, KDV dahil ${KDVDahil}`)

        if (itemName == "Kazma") db.push(message.author.id, "Kazma")
        if (itemName == "Telefon") db.push(message.author.id, "Telefon")

    } catch (e) {
        message.channel.send(e.message)
    }

}

exports.help = {
    name: "al",
    description: "Marketteki eşyaları atar.",
    usage: "b!market [komut]",
    example: "b!help kazma"
};

exports.conf = {
    aliases: ["buy", "satınal"],
    cooldown: 7.5
}