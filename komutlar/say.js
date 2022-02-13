const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let reynsesli = 0;
    for (const [id, voiceChannel] of voiceChannels) reynsesli += voiceChannel.members.size;
      const reyntepki = client.emojis.cache.find(emoji => emoji.id === "901216817614311454")
  const reyn = new Discord.MessageEmbed()
  .setColor("#FF0000")
        .setDescription(`<a:yldz:901216817614311454> \`•\` **Sayanora Medya** \n <a:tac:901214993872224288> \`•\`Sunucumuzda toplam **${message.guild.memberCount}** üye var. \n <a:tac:901214993872224288> \`•\`Seste toplam **${reynsesli}** kullanıcı var. \n <a:tac:901214993872224288> \`•\`Sunucumuza **${message.guild.premiumSubscriptionCount}** takviye yapılmış. \n <a:tac:901214993872224288> \`•\`Sunucumuzda toplam **${message.guild.members.cache.filter(m => m.presence.status !== "offline").size}** çevrimiçi üye var.`)
 .setFooter("Sayanora Medya")
  message.channel.send(reyn)
  message.react(reyntepki)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};
exports.help = {
  name: 'say',
  description: 'Sunucu bilgilerinizi gösterir.',
  usage: 'say'
};