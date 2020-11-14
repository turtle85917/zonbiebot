module.exports = {
    name: "역할정보",
    aliases: [],
    category: "정보",
    guildOnly: true,
    run: async (client, message, args, ops) => {
        let role = ops.getRole(message, args.join(" ")), sir = [];

        let embed  = new(require("discord.js")).MessageEmbed().setTitle(`${role.name} 정보`).setColor(role.color)
        .addField("**위치**", `**${`${role.rawPosition}(숫자가 낮으면 낮을수록 역할은 아래에 있음.)` || "없음"}**`)
        .addField("**생성일**", `**${ops.formatTime(role.createdAt)}**`)
        if (role.permissions.toArray().remove("VIEW_GUILD_INSIGHTS").length !== 0) {
            for (let i = 0;i < role.permissions.toArray().remove("VIEW_GUILD_INSIGHTS").length;i++) {
                sir.push(`${permissions[role.permissions.toArray().remove("VIEW_GUILD_INSIGHTS")[i]]}`)
            }
        }
        embed.addField("**가진 권한**", `**${sir.join(', ') || "없음"}**`)

        message.channel.send(embed)
    }
}

let permissions = {
    CREATE_INSTANT_INVITE: "초대 코드 만들기",
    KICK_MEMBERS: "멤버 추방하기",
    BAN_MEMBERS: "멤버 차단하기",
    ADMINISTRATOR: "관리자",
    MANAGE_CHANNELS: "채널 관리하기",
    MANAGE_GUILD: "서버 관리하기",
    ADD_REACTIONS: "반응 추가하기",
    VIEW_AUDIT_LOG: "감사 로그 보기",
    PRIORITY_SPEAKER: "우선 발언권",
    STREAM: "동영상",
    VIEW_CHANNEL: "채팅 채널 읽기 및 음성 채널 보기",
    SEND_MESSAGES: "메시지 보내기",
    SEND_TTS_MESSAGES: "TTS 메시지 보내기",
    MANAGE_MESSAGES: "메시지 관리",
    EMBED_LINKS: "링크 첨부",
    ATTACH_FILES: "파일 첨부",
    READ_MESSAGE_HISTORY: "메시지 기록 보기",
    MENTION_EVERYONE: "`\@everyone, \@here, 모든 역할 멘션하기`",
    USE_EXTERNAL_EMOJIS: "외부 이모티콘 사용하기",
    CONNECT: "연결", SPEAK: "말하기", MUTE_MEMBERS: "멤버들의 마이크 음소거하기", DEAFEN_MEMBERS: "멤버들의 헤드셋 음소거하기", MOVE_MEMBERS: "멤버 이동",
    USE_VAD: "음성 감지 사용", CHANGE_NICKNAME: "별명 번경하기", MANAGE_NICKNAMES: "별명 관리하기", MANAGE_ROLES: "역할 관리하기", MANAGE_WEBHOOKS: "웹후크 관리하기", MANAGE_EMOJIS: "이모티콘 관리하기"
}