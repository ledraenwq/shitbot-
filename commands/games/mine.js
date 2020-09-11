const Discord = require("discord.js");
const got = require("got");
const talkedRecently = new Set();
const xx = 5
const yy = 5
const db = require("quick.db")

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}

exports.run = async (bot, message, args, author) => {
  try {
    let item = db.get(message.author.id, "Kazma")
    if (item) {

      const elmas = "<:elmas:744585308024340520>";
      const stone = "<:stone:744587273898557521>";
      const lava = "<:lava:744593055444893701>";
      const pick = "<:pickaxe:744606156156174496>";
      const arrows = ['⬅', '⬆', '⬇', '➡', '❌']
      let lastPlay = Date.now()



      const maddeler = [elmas, stone, lava, pick];



      let KucukEkran = new Array(5).fill(0).map(() => new Array(5).fill(0));

      const BuyukEkranXX = 100;
      const BuyukEkranYY = 100;
      let BuyukEkran = new Array(BuyukEkranXX)
        .fill(0)
        .map(() => new Array(BuyukEkranYY).fill(0));

      function tasi(konumX, konumY, xx, yy) {

      }

      function BuyukResmiDoldur(xx, yy) {
        for (let i = 0; i < BuyukEkranXX; i++) {
          for (var j = 0; j < BuyukEkranYY; j++) {
            Olasilik = Math.random() * 100;
            if (Olasilik > 0 && Olasilik < 5) {
              BuyukEkran[i][j] = 1;
            } else if (Olasilik >= 5 && Olasilik < 30) {
              BuyukEkran[i][j] = 2;
            } else {
              BuyukEkran[i][j] = 3;
            }
          }
        }
      }

      async function myPrint(xx, yy) {
        let m = "";
        for (let i = 0; i < xx; i++) {
          for (var j = 0; j < yy; j++) {
            switch (KucukEkran[i][j]) {
              case 1:
                m += elmas;
                break;
              case 2:
                m += lava;
                break;
              case 3:
                m += stone;
                break;
            }
          }
          m += "\n";
        }
        let msg = await message.channel.send(m);
      }




      let simdiX = 50;
      let simdiY = 50;
      for (let i = 0; i < BuyukEkranXX; i++) {
        for (var j = 0; j < BuyukEkranYY; j++) {
          Olasilik = Math.random() * 100;
          if (Olasilik > 0 && Olasilik < 5) {
            BuyukEkran[i][j] = 1;
          } else if (Olasilik >= 5 && Olasilik < 30) {
            BuyukEkran[i][j] = 2;
          } else {
            BuyukEkran[i][j] = 3;
          }
        }
      }
      for (let i = 0; i < xx; i++) {
        for (var j = 0; j < yy; j++) {
          KucukEkran[i][j] = BuyukEkran[simdiX + i][simdiY + j];
        }
      }
      let m = "";
      for (let i = 0; i < xx; i++) {
        for (var j = 0; j < yy; j++) {
          switch (KucukEkran[i][j]) {
            case 1:
              m += elmas;
              break;
            case 2:
              m += lava;
              break;
            case 3:
              m += stone;
              break;
          }
        }
        m += "\n";
      }
      let msgs = await message.channel.send(m);

      const collector = message.channel.createMessageCollector(
        msg => msg.author.id == message.author.id, {
          time: 30000
        }
      )
      const interval = setInterval(() => {
        if ((Date.now() - lastPlay) / 1000 / 60 >= 2) {
          collector.stop()
          msgs.delete()
          clearInterval(interval)
        }
      }, 1000 * 60)
      for await (const msg of collector) {
        collector.on('collect', (msg) => {

          switch (msg.content.toLowerCase()) {
            case "a":
              simdiY--
              break;
            case "w":
              simdiX--
              break;
            case "s":
              simdiX++
              break;
            case "d":
              simdiY++
              break;
            case "esc":
              collector.stop()
              msgs.edit("İptal ettim")
              wait(2500)
              message.channel.bulkDelete(2)

          }

          tasi(simdiX, simdiY)
          let m1 = " "
          for (let i = 0; i < xx; i++) {
            for (var j = 0; j < yy; j++) {
              switch (KucukEkran[i][j]) {
                case 1:
                  m1 += elmas;
                  break;
                case 2:
                  m1 += lava;
                  break;
                case 3:
                  m1 += stone;
                  break;
              }
            }
            m1 += "\n";
          }
          msgs.edit(m1)
        })
      }
      msgs.edit("Şansını kaybettin")
    } else {
      message.channel.send("Kazman yok mal")
    }
  } catch (e) {
    message.channel.send(e.message)
  }
}

exports.help = {
  name: "kazı",
  description: "Minecraft elmas arama ama discord içinde",
  usage: "b!kazı",
  example: "b!kazı",
};

exports.conf = {
  aliases: ["mine", "mc"],
  cooldown: 10,
};