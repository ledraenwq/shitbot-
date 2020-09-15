const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const default_prefix = config.default_prefix;
const fs = require("fs");
const message = require("../../events/message");
const {
    stringify
} = require("querystring");

const items = JSON.parse(fs.readFileSync("items.json", "utf8"));

exports.run = async (client, message, args) => {
    let money = db.fetch(`money_${message.author.id}`);
    try {
        let itemName = "";
        let altName = "";
        let itemPrice = 0;
        let itemDesc = "";
        let itemCat = "";
        let sellPrice = "";

        for (let i in items) {
            if (args.join(" ").trim().toLowerCase() === items[i].alt.toLowerCase()) {
                itemName = items[i].ad;
                altName = items[i].alt;
                itemPrice = parseInt(items[i].fiyat);
                itemDesc = items[i].açıklama;
                itemCat = items[i].tür;
                sellPrice = items[i].satış;
            }
        }
        let oldarray = db.get(message.author.id);

        let desc = `**${itemName}** \n${itemCat} - ${sellPrice}`;
        if (itemName === "") return message.channel.send("Mal böyle bir eşya yok");
        if (!oldarray.includes(desc)) return message.channel.send("Bu eşya sende yok.");


        db.set(
            message.author.id,
            oldarray.filter((d) => d !== desc)
        );
        db.add(`money_${message.author.id}`, sellPrice);
        message.channel.send(`${sellPrice} liraya ${itemName}'i sattın.`);
    } catch (e) {
        message.channel.send(e.message);
    }
};

exports.help = {
    name: "satt",
    description: "Çantandaki eşyaları sat",
    usage: "b!sat [eşya]",
    example: "b!sat elmas",
};

exports.conf = {
    aliases: ["sell"],
    cooldown: 7.5,
};