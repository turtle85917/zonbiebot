const lyrics = (new(require('slyrics')))
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "가사",
    aliases: [],
    category: "기본명령어",
    run: async (client, message, args, tools) => {
        if (!args.join(" ")) return message.channel.send("가사를 검색할 노래 이름을 입력해달라..");

        const result = await lyrics.get("melon", args.join(" "));

        if (result.error) return message.channel.send(`\`${args.join(" ")}\`의 가사를 찾을 수 없다..`);
        else {
            const embed = new MessageEmbed().setTitle(`${result.artist} - ${result.title}`).setThumbnail(result.albumArt).setColor(0x00ff00);
            
            if (result.result.toString().length < 1700) {
                embed.setDescription(`[🎵 바로가기](${result.url})\n\n${result.result.toString()}`);
                message.channel.send(embed)
            } else {
                embed.setDescription(`[🎵 바로가기](${result.url})\n\n${result.result.toString().substr(0, 1650)}`);
                message.channel.send(embed);
                message.channel.send(new MessageEmbed().setColor(0x00ff00).setDescription(`${result.result.toString().replace(result.result.toString().substr(0, 1650), "")}`))
            }
        }
    }
}