const Discord = require("discord.js");
const got = require("got");
const talkedRecently = new Set();
const xx = 5;
const yy = 5;
const db = require("quick.db");
const fs = require("fs")

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}
const items = JSON.parse(fs.readFileSync("items.json", "utf8"))
exports.run = async (bot, message, args) => {
  try {


    const waterDesc = "**Su<:waterbuc:756141746559385702>** \nEşya - 1500"
    const logDesc = "**Odun<:logg:756144484651237497>** \nEşya - 963"
    const obsDesc = "**Obsidyen<:obsi:756143375626928200>** \nEşya - 69000"
    const buckDesc = "**Kova<:buck:756142136419942491>** \nEşya - 800"
    let pickDesc = '**Kazma<:pickaxe:744606156156174496>** \nEşya - 615'

    const water = "<:water:756135645721919588>"
    const log = "<:log:756134762128736336>"
    const obsidian = "<:obs:756137182812438538>"
    const grass = "<:grass:756134084337729686>"
    const lava = "<:lava:744593055444893701>"

    const steve = "<:steve:756136329884205077>"



    let oldarray = db.get(message.author.id);



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

    let simdiX = 50;
    let simdiY = 50;
    let kazmaX = 2;
    let kazmaY = 2;

    for (let i = 0; i < BuyukEkranXX; i++) {
      for (var j = 0; j < BuyukEkranYY; j++) {
        Olasilik = Math.random() * 100;
        if (Olasilik > 0 && Olasilik < 10) {
          BuyukEkran[i][j] = 1;
        } else if (Olasilik > 10 && Olasilik < 11) {
          BuyukEkran[i][j] = 2;
        } else if (Olasilik > 12 && Olasilik < 20) {
          BuyukEkran[i][j] = 3
        } else if (Olasilik > 20 && Olasilik < 21) {
          BuyukEkran[i][j] = 4;
        } else {
          BuyukEkran[i][j] = 5;
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
          m += steve
        } else {

          switch (KucukEkran[i][j]) {
            case 1:
              m += water;
              break;
            case 2:
              m += lava;
              break;
            case 3:
              m += log;
              break;
            case 4:
              m += obsidian;
              break;
            case 5:
              m += grass;
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



        let item = db.get(message.author.id)

        if (item === null) message.channel.send("Kovan yok")
        else if (!item.includes(buckDesc)) message.channel.send("Kovan yok")
        else if (item.includes(waterDesc)) {
          message.channel.send("Dolu kovan olduğu için kovanı doldurmadım")
        } else {
          db.set(
            message.author.id,
            item.filter((d) => d !== buckDesc)
          );
          db.push(message.author.id, waterDesc)
          KucukEkran[kazmaX][kazmaY] = 5
          BuyukEkran[simdiX + kazmaX][simdiY + kazmaY] = 5;

        }

      } else if (KucukEkran[kazmaX][kazmaY] === 2) {

        KucukEkran[kazmaX][kazmaY] = 5
        BuyukEkran[simdiX + kazmaX][simdiY + kazmaY] = 5
        collector.stop()
        db.delete(message.author.id)
        message.channel.send("Lava düştüğün için öldün, çantanı yaktın")

      } else if (KucukEkran[kazmaX][kazmaY] === 3) {

        let item = db.get(message.author.id)
        if (item.includes(logDesc)) {
          message.channel.send("Odunun olduğu için bir tane daha odun vermedim")
        } else {
          db.push(message.author.id, logDesc)

          KucukEkran[kazmaX][kazmaY] = 5
          BuyukEkran[simdiX + kazmaX][simdiY + kazmaY] = 5;
        }

      } else if (KucukEkran[kazmaX][kazmaY] === 4) {

        let item = db.get(message.author.id)
        if (item === null) message.channel.send("Kazman yok")
        else if (!item.includes(pickDesc)) message.channel.send("Kazman yok")
        else if (item.includes(obsDesc)) {
          message.channel.send("Obsidyenin olduğu için bir tane daha obsidyen vermedim")
        } else {
          db.push(message.author.id, obsDesc)

          KucukEkran[kazmaX][kazmaY] = 5
          BuyukEkran[simdiX + kazmaX][simdiY + kazmaY] = 5;
        }

      }

      tasi(simdiX, simdiY, 5, 5);
      let m1 = " ";
      for (let c = 0; c < xx; c++) {
        for (var b = 0; b < yy; b++) {
          if (c === kazmaX && b === kazmaY) {
            m1 += steve
          } else {
            switch (KucukEkran[c][b]) {
              case 1:
                m1 += water;
                break;
              case 2:
                m1 += lava;
                break;
              case 3:
                m1 += log;
                break;
              case 4:
                m1 += obsidian
                break
              case 5:
                m1 += grass
                break

            }
          }
        }
        m1 += "\n";
      }

      msgs.edit(m1);

    })


  } catch (e) {
    message.channel.send(e.message)
  }
};

exports.help = {
  name: "minecraft",
  description: "Minecraft ama discord içinde",
  usage: "b!kazı",
  example: "b!kazı",
};

exports.conf = {
  aliases: ["mcdc", "mc"],
  cooldown: 10,
};