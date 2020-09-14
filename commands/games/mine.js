const Discord = require("discord.js");
const got = require("got");
const talkedRecently = new Set();
const xx = 5;
const yy = 5;
const db = require("quick.db");

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}

exports.run = async (bot, message, args, author) => {
  try {
    let item = db.get(message.author.id, "Kazma");
    if (item) {
      const elmas = "<:elmas:744585308024340520>";
      const stone = "<:stone:744587273898557521>";
      const lava = "<:lava:744593055444893701>";
      const pick = "<:pickaxe:744606156156174496>";
      const arrows = ["⬅", "⬆", "⬇", "➡", "❌"];
      let lastPlay = Date.now();

      const maddeler = [elmas, stone, lava, pick];

      let KucukEkran = new Array(5).fill(0).map(() => new Array(5).fill(0));

      const BuyukEkranXX = 100;
      const BuyukEkranYY = 100;
      let BuyukEkran = new Array(BuyukEkranXX)
        .fill(0)
        .map(() => new Array(BuyukEkranYY).fill(0));

      function tasi(konumX, konumY, xx, yy) {
        for (let i = 0; i < xx; i++) {
          for (var j = 0; j < yy; j++) {
            KucukEkran[i][j] = BuyukEkran[konumX + i][konumY + j];
          }
        }
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
        let msgs = await message.channel.send("`W | A | S | D` kullan", m);
      }

      let simdiX = 50;
      let simdiY = 50;
      let kazmaX = 2;
      let kazmaY = 2;
      let embedSit;
      let embed;
      for (let i = 0; i < BuyukEkranXX; i++) {
        for (var j = 0; j < BuyukEkranYY; j++) {
          Olasilik = Math.random() * 100;
          if (Olasilik > 0 && Olasilik < 1) {
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
      //myPrint
      let m = "";
      for (let i = 0; i < xx; i++) {
        for (var j = 0; j < yy; j++) {
          if (i === kazmaX && j === kazmaY) {
            m += pick
          } else {

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
        }
        m += "\n";

      }


      message.channel.send("`W | A | S | D` kullanarak hareket ettir. `esc` diyerek iptal et")
      let msgs = await message.channel.send(m);

      let filter = msg => msg.author.id === message.author.id
      const collector = new Discord.MessageCollector(
        message.channel, filter
      );

      collector.on("collect", (message) => {
        if (message.content.toLowerCase() == "w") {
          kazmaX--;
          message.delete;
          if (kazmaX === -1) {
            kazmaX = 4
            simdiX = simdiX - 5
          }
        } else if (message.content.toLowerCase() == "s") {
          kazmaX++;
          message.delete();
          if (kazmaX === 5) {
            kazmaX = 0
            simdiX = simdiX + 5
          }
        } else if (message.content.toLowerCase() == "d") {
          kazmaY++;
          if (kazmaY === 5) {
            kazmaY = 0
            simdiY = simdiY + 5
          }
          message.delete();
        } else if (message.content.toLowerCase() == "a") {
          kazmaY--;
          if (kazmaY === -1) {
            kazmaY = 4
            simdiY = simdiY - 5
          }
          message.delete();

        } else if (message.content.toLowerCase() == "esc") {
          collector.stop();

          msgs.delete()
          message.channel.send("İptal ettim")
          collector.stop()


        } else {
          collector.stop()
          message.channel.send("Seçeneklerden birini söylemediğin için iptal ettim")
        }
        if (KucukEkran[kazmaX][kazmaY] === 1) {

          KucukEkran[kazmaX][kazmaY] = 3
          BuyukEkran[simdiX + kazmaX][simdiY + kazmaY] = 3;
          let items = `**Elmas<:Diamond:755024597711323136>** \nBiriktirileblir - 250 000 `
          db.push(message.author.id, items)
        } else if (KucukEkran[kazmaX][kazmaY] === 2) {
          collector.stop()
          db.delete(message.author.id)
          message.channel.send("Lava düştüğün için öldün, çantanı yaktın")
        }


        tasi(simdiX, simdiY, 5, 5);
        let m1 = " ";
        for (let c = 0; c < xx; c++) {
          for (var b = 0; b < yy; b++) {
            if (c === kazmaX && b === kazmaY) {
              m1 += pick
            } else if (embedSit === 1) {

              msgs.edit(" ", embed)
            } else {
              switch (KucukEkran[c][b]) {
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
          }
          m1 += "\n";
        }

        msgs.edit(m1);
      })


    } else {
      message.channel.send("Kazman yok mal");
    }
  } catch (e) {
    message.channel.send(e.message)
  }
};

exports.help = {
  name: "kazı",
  description: "Minecraft elmas arama ama discord içinde",
  usage: "b!kazı",
  example: "b!kazı",
};

exports.conf = {
  aliases: ["mine", "mcdd"],
  cooldown: 10,
};