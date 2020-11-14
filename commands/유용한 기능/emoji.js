const fetch = require("node-fetch")
module.exports = {
    name: "디스코드이모지",
    aliases: [],
    category: "유용한 기능",
    run: async (client, message, args) => {
        let emoji = await fetch("https://raw.githubusercontent.com/minibox724/DiscordEmojiJson/master/emojis.json").then(e => e.json()), str = [];
        if (!args.join(" ")) {
            for (let i in emoji) {
                str.push(`${emoji[i]} - ${i}`)
            }
            message.channel.send(new(require("discord.js")).MessageEmbed().setColor("GREEN").setDescription(str.slice(0, 35)))
        } else {
            for (let i in emoji) if (i.toString().includes(args.join(" "))) str.push(`${emoji[i]} - ${i.replace(args.join(' '), `**${args.join(' ')}**`).replace('_', '\\_')}`)
            if (!str[0]) return message.channel.send(`${client.emojis.cache.get('730738432929693727')} 우어.. 검색 결과가 없다..`)
            message.channel.send(new(require("discord.js")).MessageEmbed().setColor("GREEN").setDescription(str.slice(0, 20)).setTitle(`${client.emojis.cache.get("730738098463440988")} ${args.join(" ")}(에)대한 검색결과(총 ${str.length}건)`).setFooter(`${str.length > 20 ? `${str.length}건 중 20건` : `${str.length}건 중 ${str.length}건`}`))
        }
    }
}