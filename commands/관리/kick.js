const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "추방",
    aliases: ["킥"],
    category: "관리",
    guildOnly: true,
    run: async (client, message, args, ops) => {
        if (!args.join(" ")) return message.reply("우어.. 추..추방할 멤버 id 또는 이름을 적어달라...");

        if (message.deletable) message.delete();

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("우어.. 추방 권한이 필요하다...");
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`우어.. 난 추.. 방할 궎..권한이 없다.`);

        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!toKick) return message.channel.send("우어.. 멤버를 찾을 수 없..다..");

        if (message.author.id === toKick.id) return message.channel.send('우어.. 자기 자신을 추방할 수 ㅇ..없다..');
        if (client.user.id === toKick.id) return message.channel.send(`우어.. 나 자신을 감히 추방하려고!? ~~(이 새ㅋㅣ가)~~`);

        if (!toKick.kickable) return message.channel.send(`~~나도 그 녀석을 차단하고 싶은 데~~ 역할이 높아..`);

        const embed = new MessageEmbed().setColor(0xffff00)
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            .setTitle('멤버 추방됨.')
            .setDescription(stripIndents`**추방된 멤버**\n${toKick}\n\n**추방한 사람**\n${message.author}\n\n**이유**\n${args.slice(1).join(" ") ? args.slice(1).join(" ") : "없음"}`);

        const promtEmbed = new MessageEmbed().setColor(0x00ff00).setDescription(`**${toKick}**님을 진짜로 추방할건ㄱ..가?`);

        message.channel.send(promtEmbed).then(async (msg) => {
            await msg.react('✅');
            await msg.react('❎');

            msg.awaitReactions((reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id === message.author.id, {
                max: 1
            }).then((collected) => {
                if (collected.array()[0].emoji.name === '✅') {
                    msg.delete();

                    toKick.kick(args.slice(1).join(" ") || null).catch(err => message.channel.send(`에러...:\n${err}`));
    
                    message.channel.send(embed)
                } else {
                    msg.delete();

                    message.channel.send('우어.. 추방이 취소되었ㄷ..다')
                }
            })
        })
    }
}