const Discord = require("discord.js");
const got = require("got")
const talkedRecently = new Set();
const db = require("quick.db")


exports.run = async (bot, message, args) => {
    let content = args.splice(0).join(" ")
    message.channel.send(`${content} \n\n -${message.author.tag}`)
}

exports.help = {
    name: "söyle",
    description: "Bir şeyi bota söylettir.",
    usage: "b!söyle <içerijk>",
    example: "b!söyle ben havalıyım"
};

exports.conf = {
    aliases: ["say", "söz"],
    cooldown: 1
}