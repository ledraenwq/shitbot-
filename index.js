const Discord = require("discord.js");
const tutorialBot = require("./handler/ClientBuilder.js");
const client = new tutorialBot();


require("./handler/module.js")(client);
require("./handler/Event.js")(client);


client.package = require("./package.json");
client.on("warn", console.warn);
client.on("error", console.error);
client.login(process.env.TOKEN).catch(console.error);