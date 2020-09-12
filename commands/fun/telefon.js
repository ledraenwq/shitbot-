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
    try {


        let item = db.get(message.author.id, "Telefon")
        if (item) {
            let user = message.mentions.members.first()
            let msgcontent = args.splice(1).join(" ")
            if (!user) return message.channel.send("Telefonu kim için kullanacaksın?")

            message.channel.send("Bu kişiyi aramak istiyorsan `ara` mesaj atmak istiyorsan `mesaj` de")

            message.channel
                .awaitMessages((msg) => msg.author.id == message.author.id, {
                    max: 1,
                    time: 30000,
                })
                .then(async (collected) => {
                    if (collected.first().content.toLowerCase() == 'ara') {
                        let msg = await user.send(`${message.author} seni arıyor`)
                        for (let i = 0; i < 5; i++) {

                            msg.edit(`${message.author} seni arıyor.`)
                                .then(abc => {
                                    msg.edit(`${message.author} seni arıyor..`)

                                }).then(ab => {
                                    msg.edit(`${message.author} seni arıyor...`)

                                }).then(() => {
                                    msg.edit(`${message.author} seni arıyor`)
                                })

                        }
                        message.channel.send(`${user} aranıyor...`)






                        let author1 = message.author
                        let msgs = await user.send("Açmak için `aç` kapamak için `k` de")
                        let filter = m => m.author.id;
                        msgs.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000
                        }).then((collected) => {
                            if (collected.first().content.toLowerCase() == "aç") {
                                message.channel.send(`${user} telefonu açtı.`)

                                user.send(`${author1} sana "${msgcontent}" diyor`)


                            } else if (collected.first().content.toLowerCase() == "k") {
                                const attachment = new Discord.MessageAttachment("./abo.mp4")
                                user.send(attachment)
                                message.channel.send(`${user} telefonu açmadı ve cezasını çekti`)
                            }
                        })






                    } else if (collected.first().content.toLowerCase() == 'mesaj') {

                        message.channel.type === ("dm") + user.send(msgcontent)
                        message.channel.send("Başarıyla gönderildi.😃👍")
                    } else if (collected.first().content.toLowerCase() == 'iptal') {
                        return message.channel.send("İptal edildi.")
                    } else {
                        return message.channel.send("Bu bir seçenek değil")
                    }
                }).catch(() => {
                    return message.channel.send("30 sn içinde cevap vermediğin için iptal edildi")
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
    aliases: ["telf"],
    cooldown: ""
}