const Discord = require('discord.js')

    exports.run = (client, message, args) => {

        if(!message.member.roles.cache.has("886523342075596827")){
            const yetkiyok = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Bu kodu kullanmak için gerekli yetkiye sahip değilsin.**`)
            .setColor('#FFFFFF')
            return message.channel.send(yetkiyok)
        }

        let kullanici = message.mentions.members.first();
        let sebep = args.slice(1).join(' ');
        
        if(!kullanici){
            const kullanicihata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Banlanacak kişiyi etiketle...**`)
            .setColor('#FFFFFF')
            return message.channel.send(kullanicihata)
        }
        if(!sebep){
            const sebephata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Tamam banlayacağım ama, sebep girmezsen kıyamamki buna.**`)
            .setColor('#FFFFFF')
            return message.channel.send(sebephata)
        }

        if(kullanici && sebep){
            kullanici.ban({reason: sebep})

            const ban =  new Discord.MessageEmbed()
            .setDescription(`${kullanici} Kullanıcısı ${message.author} Tarafından **${sebep}** Sebebiyle Sunucudan Yasaklandı...!`)
            .setAuthor(`${message.author.username} - İyi iş çıkardın dostum`, message.author.avatarURL({dynamic: true}))
            .setColor('#FFFFFF');
            message.channel.send(ban)
        }

    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Ban','yasakla','Yasakla','banned','uçur','Uçur','BAN'],
    permLevel: 0
}

exports.help = {
    name: 'ban'
}