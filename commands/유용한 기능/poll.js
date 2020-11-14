const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "투표",
    aliases: [],
    category: "유용한 기능",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("우어.. 투표 내용을 적..어달라..")
        let items = args.join(" ").split('/')
        if (!items[1] || items.length > 10) return message.channel.send("투표..항목을 10개..이하로 적어달라..")
        const embed = new MessageEmbed().setTitle(items[0]).setColor("GREEN").setFooter(message.author.tag, message.author.avatarURL({}));

        for (let i = 0;i < items.slice(1).length;i++) {
            if (items.slice(1)[i]) {
                embed.addField(`${i + 1}번째 선택지`, `${items.slice(1)[i]}`)
            }
        }

        message.channel.send(embed).then(m => {
            for (let j = 0;j < items.slice(1).length;j++) {
                if (items.slice(1)[j]) {
                    m.react(reactions[j])
                }
            }
        })
    }
}

let reactions = {0: '1️⃣', 1: '2️⃣', 2: '3️⃣', 3: '4️⃣', 4: '5️⃣', 5: '6️⃣', 6: '7️⃣', 7: '8️⃣', 8: '9️⃣', 9: '🔟'};