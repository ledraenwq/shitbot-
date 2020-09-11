const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")
const Canvas = require("canvas")

exports.run = async (bot, message, args) => {
    try {


        let item = db.get(message.author.id, "Telefon")
        if (item) {
            let user = message.mentions.members.first()
            let msgcontent = args.splice(1).join(" ")

            message.channel.send("Bu kişiyi aramak istiyorsan `ara` mesaj atmak istiyorsan `mesaj` de")

            message.channel
                .awaitMessages((msg) => msg.author.id == message.author.id, {
                    max: 1,
                    time: 30000,
                })
                .then(async (collected) => {
                    if (collected.first().content.toLowerCase() == 'ara') {
                        let canvas = Canvas.createCanvas(620, 1234)
                        const ctx = canvas.getContext("2d")
                        const backround = await Canvas.loadImage("./calltemp.png")
                        var text = ctx.measureText(`${message.author.username} seni arıyor`)
                        message.channel.type === ("dm") + user.channel.send(canvas)
                    } else if (collected.first().content.toLowerCase() == 'mesaj') {

                        message.channel.type === ("dm") + user.send(msgcontent)
                        message.channel.send("Başarıyla gönderildi.😃👍")
                    }
                })
        } else {
            message.channel.send("Telefonun yok lol")
        }
    } catch (e) {
        message.channel.send(e.message)
    }
}


exports.help = {
    name: "telefon",
    description: "Birine mesaj at veya ara",
    usage: "b!telefon <kişi>",
    example: "b!telefon @cinoez#1881"
};

exports.conf = {
    aliases: ["add"],
    cooldown: ""
}