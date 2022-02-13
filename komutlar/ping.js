const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (app, message, client) => {
  const ottoman = new Discord.MessageEmbed()
  .setDescription('**Botun pingi Hesaplanıyor <a:yldz:901216817614311454>**')
   let start = Date.now(); 
   let mesaj = await message.channel.send(ottoman)
    let diff = (Date.now() - start); 
    let API = (app.ws.ping).toFixed(2)
    
    setInterval(() => {
        
        const ottoman = new Discord.MessageEmbed()
        .setDescription(`<a:yldz:901216817614311454> **Sayanora Medya**\nMesaj gecikme süresi; **${diff}ms** \n\n <a:yldz:901216817614311454> **Sayanora Medya**\nBot gecikme süresi; **${API}ms**`)
        mesaj.edit(ottoman);
      
    }, 5000)
  
  
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun Pingin, Ölçer',
  usage: 'ping'
};