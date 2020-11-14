const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "서버정보",
    aliases: [],
    category: "정보",
    guildOnly: true,
    run: async (client, message, args, ops) => {
        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name} 정보`)
            .setColor("BLUE")
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setDescription(`서버 ID:\n**${message.guild.id}**\n서버 생성일:\n**${ops.formatTime(message.guild.createdAt)}**\n서버 주인:\n**${message.guild.owner.user.tag}**\n서버 지역:\n${region[message.guild.region]}\n알람:\n**${defaultMessageNotifications[message.guild.defaultMessageNotifications]}**\n잠수 채널:\n**${message.guild.afkChannel ? `${message.guild.afkChannel.name}(${afkTimeout[message.guild.afkTimeout]})` : "없음"}**\n시스템 채널:\n**${message.guild.systemChannel ? message.guild.systemChannel : "없음"}**\n유저:\n**전체: ${message.guild.memberCount} (유저: ${message.guild.members.cache.filter(m => !m.user.bot).size} | 봇: ${message.guild.members.cache.filter(m => m.user.bot).size})**\n채널:\n**전체: ${message.guild.channels.cache.size} (채널: ${message.guild.channels.cache.filter(x => x.type === "text").size} | 카테고리: ${message.guild.channels.cache.filter(x => x.type === "category").size} | 음성: ${message.guild.channels.cache.filter(x => x.type === "voice").size})**\n${client.emojis.cache.get("686131200242352184")} 서버 부스트 레벨/횟수\n${(message.guild.premiumSubscriptionCount)?`**${message.guild.premiumTier}레벨 - ${message.guild.premiumSubscriptionCount}회**`:`**이 서버는 부스트가 되어 있지 않아..**`}\n\n${client.emojis.cache.get('729188272034807818')} 온라인: ${message.guild.members.cache.filter(x => x.user.presence.status == "online").size}명/${client.emojis.cache.get('729189734022250606')} 자리비움: ${message.guild.members.cache.filter(x => x.user.presence.status == "idle").size}명\n${client.emojis.cache.get('729188959741280386')} 다른 용무 중: ${message.guild.members.cache.filter(x => x.user.presence.status == "dnd").size}명/${client.emojis.cache.get('729189179585462344')} 오프라인: ${message.guild.members.cache.filter(x => x.user.presence.status == 'offline').size}명\n\n${message.guild.splash ? `[\`미리보기 이미지\`](${message.guild.splashURL({size: 2048, format: 'png'})})` : ''}\n${message.guild.banner ? `[\`서버 배너\`](${message.guild.bannerURL({size: 2048, format: 'png'})})` : ''}`)
        
        message.channel.send(embed);
        if (message.guild.premiumSubscriptionCount) message.channel.send(new MessageEmbed().setTitle(`${message.guild.name} 서버의 부스트`).setColor(0xf47fff).setDescription(message.guild.members.cache.filter(a => a.premiumSince).map(e => `${e.user.tag} -> \`${ops.formatTime(e.premiumSince)}\``).join('\n')))
    }
}

const defaultMessageNotifications = {
    ALL: "모든 메세지",
    MENTIONS: "@mentions만"
}

const region = {
    "south-korea": ":flag_kr: 대한민국 (South Korea)",
    "japan": ":flag_jp: 일본 (Japan)**",
    "brazil": ":flag_br: 브라질 (Brazil)",
    "india": ":flag_in: 인도 (India)",
    "europe": ":flag_eu: 유럽 (Europe)",
    "hongkong": ":flag_hk: 홍콩 (Hong Kong)",
    "russia": ":flag_ru: 러시아 (Russia)",
    "southafrica": ":flag_za: 남아프리카 공화국 (South Africa)",
    "singapore": ":flag_sg: 싱가포르 (Singapore)",
    "sydney": ":flag_au: 시드니 (Sydney)",
    "us-central": ":flag_us: 미국 중부 (US Central)",
    "us-east": ":flag_us: 미국 동부 (US East)",
    "us-south": ":flag_us: 미국 남부 (US South)",
    "us-west": ":flag_us: 미국 서부 (US West)"
}

const afkTimeout = {
    60: "1분",
    300: "5분",
    900: "15분",
    1800: "30분",
    3600: "1시간"
}