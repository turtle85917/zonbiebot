module.exports = async (client, message) => {
    let str = [];
    (client.db("book")).then(async(e) => {
        let s = e.filter(c => c.id === message.author.id).sort((a, b) => b.count - a.count), l = 0, k = 10;
        if (!s[0]) return message.channel.send("당신한테서 배운 게 없어요..");
        for (let i = 0;i < e.length; i++) {
            str.push(`${s[i].title} - ${s[i].desc} (${s[i].count}번 사용)`);
        }
        if (!str[0]) return message.channel.send("당신한테서 배운 게 없어요..");
        let m = await message.channel.send(`📚 \`${message.author.username}\`님의 지식\n\`\`\`${str.slice(l, k).join("\n")}\`\`\``);
        await m.react("⬅");
        await m.react("➡");
        await m.react("❌");
        const collector = m.createReactionCollector((reaction, user) => ["⬅", "➡", "❌"].includes(reaction.emoji.name) && (message.author.id === user.id));
        collector.on('collect', async(reaction, _) => {
            if (reaction.emoji.name === "➡") {
                reaction.users.remove(reaction.users.cache.filter(user => user.id === message.author.id).first().id).catch(() => {});
                if (k < str.length - 1) {
                    l += 10;
                    k += 10;
                    await m.edit(`📚 \`${message.author.username}\`님의 지식\n\`\`\`${str.slice(l, k).join("\n")}\`\`\``)
                }
            } else if (reaction.emoji.name === "⬅") {
                reaction.users.remove(reaction.users.cache.filter(user => user.id === message.author.id).first().id).catch(() => {});
                if (l !== 0) {
                    l -= 10;
                    k -= 10;
                    await m.edit(`📚 \`${message.author.username}\`님의 지식\n\`\`\`${str.slice(l, k).join("\n")}\`\`\``)
                }
            } else if (reaction.emoji.name === "❌") {
                m.reactions.removeAll().catch(() => {});
            }
        })
    })
}