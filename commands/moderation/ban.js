const Discord = require("discord.js")
const db = require("quick.db")
const {
    default_prefix
} = require("../../config.json")



exports.run = async (client, message, args) => {
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "Neden verilmemiş"
    try {
        let user = message.mentions.members.first()
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send("Bu komutu kullanmaya iznin yok<:uzucu:725952785048272927> ")

        if (!user) {
            return message.channel.send("Kimi banlayayım")
        } else {
            user.ban(reason)
            let embed = new Discord.MessageEmbed()
                .setTitle("Banlama başarılı<a:eved:731535910654705734>")
                .addField("Banlanan kişi", user)
                .addField("Neden:", reason)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        message.channel.send(e.message)
    }
}

exports.help = {
    name: "ban",
    description: "Bir kişiyi banla",
    usage: `b!ban <kişi> [sebep]`,
    example: `b!ban @cinoez#1881 piçlik yapma😉`
};

exports.conf = {
    aliases: [],
    cooldown: 7.5
}