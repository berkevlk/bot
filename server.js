var dbd = require("dbd.js");
var fs = require("fs");

var bot = new dbd.Bot({
  token: process.env.TOKEN,
  prefix: "+-"
});


bot.variables({
  name: "value"
});

var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"));
for (const file of reader) {
  const command = require(`./komutlar/${file}`);
  bot.command({
    name: command.name,
    code: command.code
  });
}

bot.onMessage()

bot.command({
   name: "sa",
   code: `
   Aleyküm selam
   `,
   nonPrefixed: true
   });


//MUZİK ALTYAPİ BURADA

bot.command({
  name: "çal",
  code: `
  $description[
  **Şarkı çalınıyor** - $songInfo[title]]
  $playSong[$message]
  $argsCheck[>1;Şarkı ismi yazarmısın?]
  $onlyIf[$voiceID!=;Lütfen ses kanalına gir]
  `
});

bot.command({
  name: "dur",
  code: `
  Şarkı durduruldu
  $stopSong
  $onlyIf[$voiceID!=;Lütfen ses kanalına gir]
  $suppressErrors[Şarkı çalmıyor :x:]
  `
  });

bot.command({
  name: "ses",
  code: `
  $description[Ses ayarlandı **$message**]
  $onlyIf[$isNumber[$noMentionMessage]!=false;Bir Sayı Girmelisin] 
  $onlyIf[$message<=100;En fazla 100'e kadar ayarlayabilirim!]
  $volume[$message]
  $onlyIf[$voiceID!=;Lütfen ses kanalına gir]
  $suppressErrors[Şarkı çalmıyor :x:]
  `
  });

bot.command({
  name: "atlat",
  code: `
  $description[Şarkı atlatıldı]
  $skipSong
  $onlyIf[$voiceID!=;Lütfen ses kanalına gir]
  $suppressErrors[Şarkı listesi bitti :x:]
  `
  });

bot.command({
  name: "kuyruk",
  code: `
  $title[Şarkı kuyruğu ( QUEUE )]
  $description[
  $queue[1]
  $queue[2]
  $queue[3]
  $queue[4]
  $queue[5]]
  `
  });