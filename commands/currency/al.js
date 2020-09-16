const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")
const default_prefix = config.default_prefix
const fs = require("fs")

const items = JSON.parse(fs.readFileSync("items.json", "utf8"))
exports.run = async (client, message, args) => {
    let money = db.fetch(`money_${message.author.id}`)
    let item = db.get(message.author.id)
    try {
        let itemName = ""
        let altName = ""
        let itemPrice = 0
        let itemDesc = ""
        let itemCat = ""
        let sellPrice = ""


        for (let i in items) {
            if (args.join(" ").trim() === items[i].alt) {
                itemName = items[i].ad;
                altName = items[i].alt;
                itemPrice = parseInt(items[i].fiyat);
                itemDesc = items[i].açıklama;
                itemCat = items[i].tür;
                sellPrice = items[i].satış;

            }
        }
        let KDV = itemPrice * 10 / 100
        let KDVDahil = itemPrice + KDV
        if (itemName === "")
            return message.channel.send("OLMAYAN BİR ŞEYİ NASIL ALACAKSIN???")
        if (money < KDVDahil)
            return message.channel.send(`Yeterli paran yok, ${KDVDahil - money} daha biriktirmen gerek<:uzucu:725952785048272927>`)
        let desc = `**${itemName}** \n${itemCat} - ${sellPrice}`
        if (item === null || !item.includes(desc)) {
            db.subtract(`money_${message.author.id}`, KDVDahil)
            message.channel.send(`${itemPrice} liraya "${itemName}" aldın, KDV dahil ${KDVDahil}`)

            db.push(message.author.id, desc)
        } else if (item.includes(desc)) return message.channel.send("Zaten bu eşyan var")


    } catch (e) {
        message.channel.send(e.message)
    }

}

exports.help = {
    name: "al",
    description: "Marketteki eşyaları satın al.",
    usage: "b!market [komut]",
    example: "b!al kazma"
};

exports.conf = {
    aliases: ["buy", "satınal"],
    cooldown: 7.5
}