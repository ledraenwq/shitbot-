const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")
const default_prefix = config.default_prefix
const fs = require("fs")

const items = JSON.parse(fs.readFileSync("items.json", "utf8"))

exports.run = async (client, message, args) => {
    try {


        let categories = [];

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