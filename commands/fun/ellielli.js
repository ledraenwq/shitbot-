const Discord = require("discord.js");
const got = require("got")


exports.run = async (bot, message, args) => {

  function wait(ms) {
    var d = new Date();
    var d2 = null;
    do {
      d2 = new Date();
    } while (d2 - d < ms);
  }

  if (message.channel.nsfw) {
    const m = await message.channel.send(
      'Rahatsız edici görseller çıkabilir, devam etmek istiyorsan `e` istemiyorsan `h` de'
    );

    message.channel
      .awaitMessages((msg) => msg.author.id == message.author.id, {
        max: 1,
        time: 30000,
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == 'e') {
          const embed = new Discord.MessageEmbed();
          got('https://www.reddit.com/r/fiftyfifty/random/.json').then(
            (response) => {
              let content = JSON.parse(response.body);
              let permalink = content[0].data.children[0].data.permalink;
              let memeUrl = `https://reddit.com${permalink}`;
              let memeImage = content[0].data.children[0].data.url;
              let memeTitle = content[0].data.children[0].data.title;
              let memeUpvotes = content[0].data.children[0].data.ups;
              let memeDownvotes = content[0].data.children[0].data.downs;
              let memeNumComments =
                content[0].data.children[0].data.num_comments;
              embed.setTitle(`50/50`);
              embed.setImage(memeImage);
              embed.setColor('RANDOM');
              embed.setFooter(`@${message.author.tag} tarafından istendi. `)
                .setTimestamp
              message.channel.send(embed);
            }
          );
        } else if (collected.first().content.toLowerCase() == 'h') {
          m.edit('Risk atladıldı <:pepeOK:725958574303346752>');
        }
      })
      .catch(() => {
        message.reply(
          ' 30 saniye içinde cevap vermediğin için şansını kaybettin'
        );
      });
  } else {
    message.channel.send('NSFW çıkabileceği için NSFW kanalında yapman gerek!');
  }
}

exports.help = {
  name: "50/50",
  description: "Ya manzara yemek vb. içeren fotoğraflar atar ya da şiddet içerikli fotoğraflar atar. r/FiftyFifty ile çalışır.",
  usage: "b!50/50",
  example: "b!50/50"
};

exports.conf = {
  aliases: ["ellielli", "fiftyfifty"],
  cooldown: 5
}