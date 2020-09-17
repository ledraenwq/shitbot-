const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const default_prefix = config.default_prefix;
const fs = require("fs");
const message = require("../../events/message");


const items = JSON.parse(fs.readFileSync("items.json", "utf8"));
const ores = JSON.parse(fs.readFileSync("ores.json", "utf8"));
const items3 = JSON.parse(fs.readFileSync("items3.json", "utf8"));

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


        if (itemName === "") {
            for (let o in ores) {
                if (args.join(" ").trim().toLowerCase() === ores[o].alt.toLowerCase()) {
                    itemName = ores[o].ad;
                    altName = ores[o].alt;
                    itemPrice = parseInt(ores[o].fiyat);
                    itemDesc = ores[o].açıklama;
                    itemCat = ores[o].tür;
                    sellPrice = ores[o].satış;
                }
            }
            if (itemName === "") {
                for (let i in items3) {
                    if (args.join(" ").trim().toLowerCase() === items3[i].alt.toLowerCase()) {
                        itemName = items3[i].ad;
                        altName = items3[i].alt;
                        itemPrice = parseInt(items3[i].fiyat);
                        itemDesc = items3[i].açıklama;
                        itemCat = items3[i].tür;
                        sellPrice = items3[i].satış;
                    }
                }

                if (itemName === "") return message.channel.send("Mal böyle bi eşya yok")
            }
        }
        let desc = `**${itemName}** \n${itemCat} - ${sellPrice}`;
        if (oldarray === null) return message.channel.send("Bu eşya sende yok")
        if (!oldarray.includes(desc)) return message.channel.send("Bu eşya sende yok.");
        if (altName == "su") {
            db.set(
                message.author.id,
                oldarray.filter((d) => d !== desc)
            )
            const buckDesc = "**Kova<:buck:756142136419942491>** \nEşya - 800"
            db.push(message.author.id, buckDesc);
            message.channel.send(`${sellPrice} liraya ${itemName}'i sattın.`);
        } else {


            db.set(
                message.author.id,
                oldarray.filter((d) => d !== desc)
            );
            db.add(`money_${message.author.id}`, sellPrice);
            message.channel.send(`${sellPrice} liraya ${itemName}'i sattın.`);
        }
    } catch (e) {
        message.channel.send(e.message);
    }
};

exports.help = {
    name: "sat",
    description: "Çantandaki eşyaları sat",
    usage: "b!sat [eşya]",
    example: "b!sat elmas",
};

exports.conf = {
    aliases: ["sell"],
    cooldown: 7.5,
};