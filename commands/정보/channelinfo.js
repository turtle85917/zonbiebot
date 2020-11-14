const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "채널정보",
    aliases: [],
    guildOnly: true,
    category: "정보",
    run: async (client, message, args, ops) => {
        let channel = ops.getChannel(message, args.join(" "));

        const embed = new MessageEmbed().setTitle(`${channel.name} 채널 정보`).setColor("RED").setFooter(channel.guild.name, channel.guild.iconURL()).setTimestamp().addField("채널 ID", `**${channel.id}**`);

        if (channel.parent) embed.addField("카테고리", `**${channel.parent.name}**`)
        if (channel.type === "text") embed.addField("채널주제", `**${channel.topic || "없음"}**`)
        
        embed.addField("채널 타입", `**${type[channel.type]}**`)
            .addField("채널 생성 시간", `**${ops.formatTime(channel.createdAt)}**`)
        
        if (channel.type === "voice") embed.addField("비트레이트", `**${channel.bitrate / 1000}kbps**`)
        if (channel.type === "text") embed.addField("슬로우모드", `**${channel.rateLimitPerUser ? `${channel.rateLimitPerUser}초` : "없음"}**`)

        embed.addField("채널 위치", `**${channel.rawPosition || "없음"}(숫자가 낮으면 낮을수록 채널은 위에 있음.)**`)

        message.channel.send(embed)
    }
}

const type = {
    text: "텍스트 채널",
    voice: "음성 채널",
    news: "공지 채널",
    store: "상점 채널"
}