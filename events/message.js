try {

  const Discord = require("discord.js"),
    cooldowns = new Discord.Collection(),
    db = require("quick.db");

  let config = require("../config.json")

  const default_prefix = config.default_prefix;

  function wait(ms) {
    var d = new Date();
    var d2 = null;
    do {
      d2 = new Date();
    } while (d2 - d < ms);
  }




  module.exports = async (client, message) => {
    if (message.author.bot || message.author === client.user) return;



    let inviteLink = ["discord.gg/", "discord.com/invite", "discordapp.com/invite"];

    if (inviteLink.some(word => message.content.toLowerCase().includes(word))) {
      await message.delete();
      return message.channel.send("Aga burada reklam yapamazsın")
        .then(m => m.delete({
          timeout: 10000
        }))
    }

    if (message.content.toLowerCase() == "sa") {
      const msg = await message.channel.send("as = ananı s...")
      wait(2500)
      msg.edit("Şaka şaka").then(a => {
        wait(2500)
        msg.edit("Vurma lan").then(k => {
          wait(2500)
          msg.edit("Aleyküm selam")
        })
      })


    }

    if (message.content == "31") {
      let chance = Math.ceil(Math.random() * 2)
      if (chance == 1)
        return message.channel.send("Komikmiş aga")
      else
        return message.channel.send("sjsjsjsj")
    }

    if (message.content.toLowerCase() == "qwe") {
      let qwes = ["qqwe:QwEq:WeQWQWEqwe", "q:WqEqwqwewqQ:w:eW:Qe", "qw:eqw:E:q:e:wqweqweqweQWe"]
      let qwe = qwes[Math.floor(Math.random() * qwes.length)]
      return message.channel.send(qwe)
    }

    if (message.content.toLowerCase().includes("hmmmm")) {

      return message.channel.send("<a:abo:753961981651714088>")
    }


    if (message.content.toLowerCase().includes("amk")) {

      return message.channel.send("amk")
    }


    if (message.content.toLowerCase().includes("anneni sikeyim")) {

      return message.channel.send("ben de senin🙂")
    }


    if (message.content.toLowerCase().includes("bruh")) {
      let chance = Math.ceil(Math.random() * 2)
      if (chance === 1)
        return message.channel.send(`Bruh Moment öyle bir andır ki: Denizler ikiye ayrılır,Dağ|ar yerinden oynar,KasırgaIar Savrulur,Vo|kan|ar patlar, Gök gürler,Yer sarsılır,AnaIar ağlar,Çocuk|ar korkanlnsanlar öfkeden ve nefretten patlar! Dünyaya müthiş bir korku yayılır... Gökyüzü kararır... Deniz kana dönüşür... İşte Bruh Moment anı böyle bir andır... Lakin bruh anı vibe check tarafından öldürülmüştür.. İnsanların kurtarıcısı vibe check olmuştur... Vibe check Tanrının insanlığa bir hediyesi oldu. Tanrılar insanlara 2. bir şans verdi. Kendilerini düzeltme şansı... Yaptıkları günahlardan kurtulma şansı... Bruh moment efsanesi eskiden duyulmuşturArtık pek bir önemi kalmadı çünkü bruh moment ortadan kalktı.. Vibe checkler sayesinde insanlık Bruh moment anından kurtuldu ve sevinç çığlıkları attı: "Yaşasın! Bruh moment artık yok!"."Yaşasın! Vibe check!" Bruh moment artık insanlığa etki edemiyecekti. Fakat bu onun bir efsane, bir destan olduğu gerçeğini değiştirmiyordu. İnsanlar Bruh moment anına: Yiğidi öldür ama hakkını yeme dedi ve günümüze kadar onun hakkında hiçbir bilgiyle oynayıp, değiştirmedi. Bruh moment Covid-19'dan bile daha beter etmişti insanlığı... Kara vebadan daha arsızdı... Uzaylılar kadar gelişmişti lakin oda bu dünyanın bir ürünüydü.. Bu dünyanın pis tarafının bir ürünü... Tanrılar Bruh moment anını insanları cezalandırmak için gönderdi... Sonrada insanlığı bruh anından kurtardı“ İnsanlar dersini almıştı.. Ve bir daha yaptıkları günahları tekrar etmediler.. Kurbanlar verip, Tanrıdan af dilediler.. Tanrıda Vibe checki onlara gönderdi... Ama olan Bruh moment anına olmuştu... Bruh moment öfke ile doluydu.. Tanrılar bu sefer bruh moment anını insanlara düşman olduğu için cezalandırıyordu.. Bruh`)
    } else if (chance === 2) {
      return message.channel.send("Bruuuuuuhh")
    }


    if (message.content.includes(["@everyone"]))
      if (message.member.hasPermission("MANAGE_GUILD")) return
    else {
      message.delete()
      message.channel.send("Ever atamazsın.")
      message.delete()
    }
    if (message.content.includes(["@here"]))
      if (message.member.hasPermission("MANAGE_GUILD")) return
    else {
      message.delete()
      message.channel.send("Here atamazsın.")
      message.delete()
    }



    if (!message.guild) return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = default_prefix;



    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let msg = message.content.toLowerCase();
    let cmd = args.shift().toLowerCase();
    let sender = message.author;

    message.flags = []
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;


    if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());

    const member = message.member,
      now = Date.now(),
      timestamps = cooldowns.get(commandFile.help.name),
      cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

    if (!timestamps.has(member.id)) {
      if (!client.config.owners.includes(message.author.id)) {

        timestamps.set(member.id, now);
      }
    } else {
      const expirationTime = timestamps.get(member.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(`Daha **${timeLeft.toFixed(1)}** saniye beklemen lazım`);
      }

      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }

    try {
      if (!commandFile) return;
      commandFile.run(client, message, args);
    } catch (error) {
      console.log(error.message);
    }
  }
} catch (e) {
  message.channel.send(e.message)
}