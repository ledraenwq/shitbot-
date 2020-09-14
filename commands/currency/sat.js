const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")
const default_prefix = config.default_prefix
const fs = require("fs");
const message = require("../../events/message");
const {
    stringify
} = require("querystring");

const items = JSON.parse(fs.readFileSync("items.json", "utf8"))



exports.run = async (client, message, args) => {

    let money = db.fetch(`money_${message.author.id}`)
    try {
        let itemName = ""
        let itemPrice = 0
        let sellPrice = 0
        let itemDesc = ""

        for (let i in items) {
            if (args.join(" ").trim().toLowerCase() === items[i].alt.toLowerCase()) {
                itemName = items[i].alt;
                itemPrice = parseInt(items[i].fiyat);
                sellPrice = parseInt(items[i].satış)
                itemDesc = items[i].açıklama;
            }
        }
        let item = db.get(message.author.id, itemName)

        if (itemName === "") return message.channel.send("Mal böyle bir eşya yok")
        if (!item) return message.channel.send("Bu eşya sende yok.")

        db.push(message.author.id, " ")
        db.add(`money_${message.author.id}`, sellPrice)
        message.channel.send(`${sellPrice} liraya \`${itemName}\`'i sattın.`)


    } catch (e) {
        message.channel.send(e.message)
    }

}


exports.help = {
    name: "sat",
    description: "Çantandaki eşyaları sat",
    usage: "b!sat [eşya]",
    example: "b!sat elmas"
};

exports.conf = {
    aliases: ["sell"],
    cooldown: 7.5
}