const { MessageEmbed } = require("discord.js"),
    { stripIndents } = require("common-tags");

module.exports = {
    name: "유저정보",
    aliases: [],
    guildOnly: true,
    category: "정보",
    run: async (client, message, args, ops) => {
        let member = ops.getMember(message, args.join(" ")),
            UIE = new MessageEmbed().setFooter(member.user.username, member.user.displayAvatarURL({dynamic: true})).setThumbnail(member.user.displayAvatarURL({dynamic: true})).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor).setTimestamp().setTitle(`${member.user.username} 정보`)
            .addField(`유저 이름/ID`, stripIndents`**${member.user.username}\n${member.user.id}**`)
            .addField(`디스플레이 이름`, stripIndents`**${member.displayName}**`)
            .addField(`디스코드 태그`, `**${member.user.tag}**`)
        
        if (member.user.presence.status !== "offline" && !member.user.bot) {
            if (member.user.presence.clientStatus.desktop) UIE.addField(`디스코드 클라이언트`, `**🖥 디스코드 앱**`)
            else if (member.user.presence.clientStatus.web) UIE.addField(`디스코드 클라이언트`, `**⌨ 웹**`)
            else if (member.user.presence.clientStatus.mobile) UIE.addField(`디스코드 클라이언트`, `**📱 모바일**`)
        }
        UIE.addField(`상태`, `**${require("../../src/tools/emoiji").user_status[member.user.presence.status]} ${status[member.user.presence.status]}**`)
        .addField("서버에 들어온 날짜", `**${ops.formatTime(member.joinedAt)}**`)
        .addField("디스코드 가입 날짜", `**${ops.formatTime(member.user.createdAt)}**`)

        if(member.user.flags && !member.user.bot) UIE.addField(`뱃지`, `**${member.user.flags.toArray().map(x => ops.hype(client, x.toString()) || `인증된 봇 주인`)}**`)
 
        member.presence.activities[0] && UIE.addField("상태 메세지/게임", member.presence.activities.map(a => `${a.type === "CUSTOM_STATUS" ? `상태메세지: **${a.emoji ? a.emoji && a.state ? `${a.emoji} ${a.state}` : a.emoji : a.state}**` : `게임: **${a.name}**`}`).join("\n"))

        message.channel.send(UIE)
    }
}

const status = {online: "온라인", idle: "자리 비움", dnd: "다른 용무 중", offline: "오프라인"};