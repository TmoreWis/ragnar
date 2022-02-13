const Discord = require("discord.js");
const db = require("croxydb");
exports.run = async (client, message, args) => {
  let prefix = "s!"

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("❌ Bu Komutu Kullanabilmek İçin `ÜYELERI YASAKLA` Yetkisine Sahip Olmalısın!");

    if (!args[0] || !["aç", "kapat"].includes(args[0]))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Yanlış Komut Kullanımı")
          .addField(
            "Doğru Kullanım",
            "`" +
              prefix +
              "sayaç aç <sayı> <#kanal>` veya `" +
              prefix +
              "sayaç kapat` Yazın"
          )
          .setColor("RED")
          .setThumbnail(message.guild.iconURL())
          .setFooter(message.guild.name)
      );
    if (args[0] == "aç") {
      let sayı = args[1];
      if (!sayı) return message.reply("❌ Bir Sayı Girmelisin!");
      if (sayı < message.guild.members.cache.size)
        return message.reply(
          "❌ Sayaç Sayısı Sunucudaki Üye Sayısından Fazla Olmalıdır!\n**Üye Sayısı:** " +
            message.guild.members.cache.size
        );
      let mkanal = message.mentions.channels.first();
      if (!mkanal) return message.reply("❌ Bir Kanal Etiketlemelisin!");

      db.set("sayaç." + message.guild.id, {
        kanal: mkanal.id,
        sayi: sayı
      });

      let embed = new Discord.MessageEmbed()
        .setTitle("✅ Sayaç Ayarlandı ✅")
        .setDescription(
          `🔸 **Sayaç Kanalı:** ${mkanal}\n🔸 **Sayaç:** \`${sayı}\``
        )
        .setFooter("Server Support", message.author.avatarURL())
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send(embed);
    }
    if (args[0] == "kapat") {
      if (!db.get("sayaç." + message.guild.id))
        return message.channel.send(
          "❌ Sunucunuzda **Sayaç Sistemi** Ayarlanmamış!"
        );
      if (db.get("sayaç." + message.guild.id)) {
        db.delete("sayaç." + message.guild.id);
        message.channel.send("✅  Sayaç Sıfırlandı!");
      }
    }
}

exports.conf = {
  aliases: ["sayaç"]
};
//dcs ekibi
exports.help = {
  name: "counter"
};