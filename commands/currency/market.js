const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")
const default_prefix = config.default_prefix
const fs = require("fs")

const items = JSON.parse(fs.readFileSync("items.json", "utf8"))
const ores = JSON.parse(fs.readFileSync("ores.json", "utf8"));
const items2 = JSON.parse(fs.readFileSync("items3.json", "utf8"));

exports.run = (client, message, args) => {
    try {


        let categories = [];
        let orecategories = [];
        let icategories = [];

        if (!args[0]) {
            for (let i in items) {

                if (!categories.includes(items[i].ad)) {}
                categories.push(items[i].ad)
            }


            const embed = new Discord.MessageEmbed()
                .setTitle("Mağaza")
                .setColor("RANDOM")

            for (let i = 0; i < categories.length; i++) {

                let tempDesc = "";


                for (let c in items) {
                    if (categories[i] === items[c].ad) {
                        tempDesc += `**Tür:** ${items[c].tür}\n**Fiyat:** ${items[c].fiyat} \n**Satış Fiyatı:** ${items[c].satış} \n**Açıklama:** ${items[c].açıklama}\n`
                    }
                }

                embed.addField(categories[i], tempDesc)
            }

            message.channel.send(embed)
        } else if (args[0] == "2") {




            for (let o in ores) {

                if (!orecategories.includes(ores[o].ad)) {
                    orecategories.push(ores[o].ad)
                }
            }


            const oreembed = new Discord.MessageEmbed()
                .setTitle("Mağaza")
                .setColor("RANDOM")

            for (let o = 0; o < orecategories.length; o++) {

                let oreDesc = "";


                for (let r in ores) {
                    if (orecategories[o] === ores[r].ad) {
                        oreDesc += `**Tür:** ${ores[r].tür}\n**Fiyat:** ${ores[r].fiyat} \n**Satış Fiyatı:** ${ores[r].satış} \n**Açıklama:** ${ores[r].açıklama}\n`
                    }


                }
                oreembed.addField(orecategories[o], oreDesc)
            }
            message.channel.send(oreembed)
        } else if (args[0] == "3") {

            for (let ii in items2) {

                if (!icategories.includes(items2[ii].ad)) {
                    icategories.push(items2[ii].ad)
                }
            }


            const iEmbed = new Discord.MessageEmbed()
                .setTitle("Mağaza")
                .setColor("RANDOM")

            for (let ii = 0; ii < icategories.length; ii++) {

                let iDesc = "";


                for (let ic in items2) {
                    if (icategories[ii] === items2[ic].ad) {
                        iDesc += `**Tür:** ${items2[ic].tür}\n**Fiyat:** ${items2[ic].fiyat} \n**Satış Fiyatı:** ${items2[ic].satış} \n**Açıklama:** ${items2[ic].açıklama}\n`
                    }


                }
                iEmbed.addField(icategories[ii], iDesc)
            }
            message.channel.send(iEmbed)
        }

    } catch (e) {
        message.channel.send(e.message)
    }

}

exports.help = {
    name: "market",
    description: "Marketteki eşyaları atar.",
    usage: "b!market [komut]",
    example: "b!help kazma"
};

exports.conf = {
    aliases: ["mağaza", "dükkan"],
    cooldown: 7.5
}