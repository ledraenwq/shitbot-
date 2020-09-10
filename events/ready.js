module.exports = bot => {
  
  console.log(`${bot.user.username} is online in ${bot.guilds.cache.size} servers`);

  let statuses = ['b!yardım/b!help', `${bot.guilds.cache.size} serverda komut `, `${bot.users.cache.size} kullanıcıyı`]

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];

    bot.user.setActivity(`${status}`, {type: "WATCHING"});
  }, 5000);
}