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


let filmler = ["The Truman Show",
    "Inception",
    "Interstellar",
    "Forrest Gump",
    "ET",
    "Dead Poets Society",
    "The Freedom Writers",
    "Hidden Figures",
    "Rain Man",
    "The Green Mile",
    "Good Will Hunting",
    "A.I",
    "Harry Potter Serisi",
    "Matrix",
    "Back to the Future",
    "The Seven Pounds",
    "Adminin favorisi: 'The Pursuit of Happines'",
    "The Prestige"
]





exports.run = async (bot, message, args) => {
    try {

        let film = filmler[Math.ceil(Math.random() * filmler.length)]
        let money = db.fetch(`money_${message.author.id}`)

        let msg = await message.channel.send("300 lira vererek film almak istediğinden emin misin? Hepsi dersen 1000 alıcam (`E`/`H`/`hepsi`)")

        message.channel
            .awaitMessages((msg) => msg.author.id == message.author.id, {
                max: 1,
                time: 30000,
            }).then(async (collected) => {
                if (collected.first().content.toLowerCase() == "e") {
                    if (money < 300) return message.channel.send(`Yeterli paran yok. ${300 - money} biriktirerek alabilirsin.`)
                    db.subtract(`money_${message.author.id}`, 300)
                    db.add(`money_${697337494571712576}`, 300)
                    message.channel.send(`Film adı: ${film}`)

                } else if ((collected.first().content.toLowerCase() == "h")) {
                    msg.edit("Bir damla kültür kaybettin.")
                } else if (collected.first().content.toLowerCase() == "hepsi") {
                    if (money < 1000) return message.channel.send(`Yeterli paran yok. ${1000 - money} biriktirerek alabilirsin.`)
                    db.subtract(`money_${message.author.id}`, 1000)
                    db.add(`money_${697337494571712576}`, 1000)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("Adminden film önerisi")
                        .setDescription(filmler)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter(`${message.author.tag} tarafından istendi`)
                    message.channel.send(embed)

                } else {
                    return message.channel.send("Bu bir seçenek değil.")
                }
            })

    } catch (e) {
        message.channel.send(e.message)
    }
}


exports.help = {
    name: "film",
    description: "Adminden film önerisi",
    usage: "b!film>",
    example: "b!film"
};

exports.conf = {
    aliases: ["movie"],
    cooldown: ""
}