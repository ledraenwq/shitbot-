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
        let items = db.fetch(message.author.id)
        let user = message.author || message.mentions.users.first()
        if (items === null) items = "Bu kullanıcı fakir (hiç bir şeyi yok abo)"

        let embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}'in envanteri`)
            .setColor("RANDOM")
            .addField("Eşyalar", items)
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        message.channel.send(e.message)
    }
}

exports.help = {
    name: "envanter",
    description: "Envanterinde ne olduğunu gör",
    usage: "b!envanter <kişi>",
    example: "b!envanter @cinoez#1881"
};

exports.conf = {
    aliases: ["çanta"],
    cooldown: 5
}