const { MessageEmbed } = require("discord.js");

module.exports = {
    name: '언밴',
    aliases: [],
    category: '관리',
    guildOnly: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('우어.. 언밴할 유저 ID를 입력하라..\n(ID는 설정에서 **개발자 모드**를 키신 후 언밴할 멤버의 ID를 복사하면 됩니다.)');

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("우어.. 차단 권한이 필요하다...");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`우어.. 난 단..차단할 궎..권한이 없다.`);

        if (args[0] === client.user.id) return message.channel.send(`나로 갖다가 나를 언밴하려고!? ~~(이 새ㅋㅣ가..)~~`)

        message.guild.members.unban(args[0], args.slice(1).join(" ") || null).then(e => message.channel.send(new MessageEmbed().setTitle('멤버 언밴').setColor(0x00ff00).setFooter(e.tag, e.displayAvatarURL()).setDescription(`${e.tag}님이 ${message.guild.name}에서 언밴 처리 되었습니다.`))).catch(e => message.channel.send(`Error...:\n${e}`))
    }
}