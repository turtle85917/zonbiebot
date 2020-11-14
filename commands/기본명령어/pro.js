module.exports = {
    name: '권한확인',
    aliases: ['권한'],
    category: "기본명령어",
    run: async (_, message, args) => {
        if (!args.join(' ')) return message.channel.send("멤버 id/이름 또는 역할 id/이름을 적어주세요!");
        let pro  = message.guild.members.cache.get(args.join(' ')) || message.mentions.members.first() || message.guild.members.cache.find(m => m.displayName.toLowerCase().includes(args.join(' ')) || m.user.username.toLowerCase().includes(args.join(" ")) || m.user.tag.toLowerCase().includes(args.join(" "))) || message.guild.roles.cache.get(args.join(" ")) || message.mentions.roles.first() || message.guild.roles.cache.find(m => m.name.toLowerCase().includes(args.join(" "))) || message.guild.roles.cache.find(m => m.id.toLowerCase() == args.join(" ")) || message.member.roles.highest;
        if (!pro) return message.channel.send("멤버 id/이름 또는 역할 id/이름을 확인해주세요!");
        try {
            let p = pro.permissions.toArray().remove("VIEW_GUILD_INSIGHTS"), str = [];
            for (let i = 0;i < permissions_list.length;i++) {
                if (permissions_list[i] === p[i]) {
                    str.push(`${permissions[permissions_list[i]]} ✅`)
                } else str.push(`${permissions[permissions_list[i]]} ❌`)
            }
            message.channel.send(new(require('discord.js')).MessageEmbed().setColor("GREEN").setDescription(str.join('\n') || '없음').setTitle(`${pro.user ? `${pro.user.username} 유저 권한` : `${pro.name} 역할 권한`}`))
        } catch (e) {return message.channel.send(`권한이 없거나 에러가 났습니다.\n${e}`)}
    }
}
let permissions = {CREATE_INSTANT_INVITE: "초대 코드 만들기", KICK_MEMBERS: "멤버 추방하기", BAN_MEMBERS: "멤버 차단하기", ADMINISTRATOR: "관리자", MANAGE_CHANNELS: "채널 관리하기", MANAGE_GUILD: "서버 관리하기", ADD_REACTIONS: "반응 추가하기", VIEW_AUDIT_LOG: "감사 로그 보기", PRIORITY_SPEAKER: "우선 발언권", STREAM: "동영상", VIEW_CHANNEL: "채팅 채널 읽기 및 음성 채널 보기", SEND_MESSAGES: "메시지 보내기", SEND_TTS_MESSAGES: "TTS 메시지 보내기", MANAGE_MESSAGES: "메시지 관리", EMBED_LINKS: "링크 첨부", ATTACH_FILES: "파일 첨부", READ_MESSAGE_HISTORY: "메시지 기록 보기", MENTION_EVERYONE: "@everyone, @here, 모든 역할 멘션하기", USE_EXTERNAL_EMOJIS: "외부 이모티콘 사용하기", CONNECT: "연결", SPEAK: "말하기", MUTE_MEMBERS: "멤버들의 마이크 음소거하기", DEAFEN_MEMBERS: "멤버들의 헤드셋 음소거하기", MOVE_MEMBERS: "멤버 이동", USE_VAD: "음성 감지 사용", CHANGE_NICKNAME: "별명 번경하기", MANAGE_NICKNAMES: "별명 관리하기", MANAGE_ROLES: "역할 관리하기", MANAGE_WEBHOOKS: "웹후크 관리하기", MANAGE_EMOJIS: "이모티콘 관리하기"}, permissions_list = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]