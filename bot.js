const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: '' });
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {

    // Oynuyor Kısmı
  
    client.user.setPresence({ activity: { type: "WATCHING", name: `Sayanora Medya - Moderasyon`}, status: 'online' })
    
      //------------------------------------------------------------------------------------------------------------\\

      client.on("message", message => {
        if(message.content.toLowerCase() == "sa") 
        return message.channel.send(`${message.author}, Aleyküm Selam.`)
      });
      
      client.on("message", message => {
        if(message.content.toLowerCase() == "selam") 
        return message.channel.send(`${message.author}, Selam hoşgeldin.`)
      });
      
      client.on("message", message => {
        if(message.content.toLowerCase() == "merhaba") 
        return message.channel.send(`${message.author}, Merhaba hoşgeldin.`)
      });
      
      client.on("message", message => {
        if(message.content.toLowerCase() == "selamun aleyküm") 
        return message.channel.send(`${message.author}, Aleyküm Selam.`)
      });
      
      client.on("message", message => {
        if(message.content.toLowerCase() == "sea")
        return message.channel.send(`${message.author}, Aleyküm Selam.`)
      });
      
      client.on("message", message => {
        if(message.content.toLowerCase() == "slm") 
        return message.channel.send(`${message.author}, Selam hoşgeldin.`)
      });


      //------------------------------------------------------------------------------------------------------------\\

      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);

  /// botu sese sokma //
  client.on("ready", () => {
    client.channels.cache.get('886523342100774951').join();
  });

  client.on("guildMemberAdd", member => {       
    let otorol = '886523341974941696' 
      member.roles.add(otorol) 
    });

    client.on("guildMemberAdd", async member => {
      const cdb = require("croxydb")
      const profil = cdb.get("sayaç." + member.guild.id);
      if (profil) {
        let sayaçkanalID = profil.kanal;
        let sayaçsayı = profil.sayi;
        let sayaçkanal = client.channels.cache.get(sayaçkanalID);
        let aralık =
          parseInt(sayaçsayı) - parseInt(member.guild.members.cache.size);

        if (member.guild.memberCount > sayaçsayı) {
         cdb.delete("sayaç." + member.guild.id);
          const e = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .setThumbnail(member.user.avatarURL())
            .setFooter(member.displayName)
            .setDescription(
              `**\`${member.user.tag}\` Sunucuya Katıldı!\n\nHey Sonunda Hedeflenen Üye Sayısına Ulaştık ve Sayaç Sıfırlandı Sunucumuz Şuan Anlık Olarak \`${member.guild.memberCount}\` Üyeye Sahip!**`
            );
          sayaçkanal.send(e);
        } else {
          const e = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .setThumbnail(member.user.avatarURL())
            .setFooter(member.displayName)
            .setDescription(
              `**\`${member.user.tag}\` Sunucuya Katıldı!\n\nHedeflenen Üye Sayısı \`${sayaçsayı}\`\nBelirlenen Üye Sayısına Ulaşmaya \`${aralık}\` Kişi Kaldı!\nSunucuda Şuan \`${member.guild.members.cache.size}\` Üye Var!**`
            );
          sayaçkanal.send(e);
        }
    }
});


client.on("guildMemberRemove", async member => {
const cdb = require("croxydb")
      const profil = cdb.get("sayaç." + member.guild.id);
      if (profil) {
        let sayaçkanalID = profil.kanal;
        let sayaçsayı = profil.sayi;
        let sayaçkanal = client.channels.cache.get(sayaçkanalID);
        let aralık =
          parseInt(sayaçsayı) - parseInt(member.guild.members.cache.size);

        const ee = new Discord.MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setThumbnail(member.user.avatarURL())
          .setFooter(member.user.tag)
          .setDescription(
            `**\`${member.user.tag}\` Sunucudan Ayrıldı\n\nHedeflenen Üye Sayısı \`${sayaçsayı}\` \nHedefe Ulaşmamıza \`${aralık}\` Kişi Kaldı!\nSunucuda Şuan \`${member.guild.members.cache.size}\` Üye Var!**`
          );
        sayaçkanal.send(ee);
      }
  
});
