module.exports = async (client, message) => {
    let str = [];
    (client.db("book")).then(async(e) => {
        let c = e.sort((a, b) => b.count - a.count), p = 0, r = 10;
        for (let i = 0;i < e.length; i++) {
            let users = client.users.cache.get(e[i].id);
            if (users) str.push(`[${users.username}#${users.discriminator.replace(/..$/, '**')}] ${c[i].title} - ${c[i].desc} (${c[i].count}번 사용)`);
        }
        if (!str[0]) return message.channel.send("배운 게 없어요.");
        let g = await message.channel.send(`존비봇 지식\n\`\`\`${str.slice(p, r).join("\n")}\`\`\``);
        await g.react("⬅");
        await g.react("➡");
        await g.react("❌");
        const collector = g.createReactionCollector((reaction, user) => ["⬅", "➡", "❌"].includes(reaction.emoji.name) && (message.author.id === user.id));
        collector.on('collect', async(reaction, _) => {
            if (reaction.emoji.name === "➡") {
                reaction.users.remove(reaction.users.cache.filter(user => user.id === message.author.id).first().id).catch(() => {});
                if (r < c.length - 1) {
                    p += 10;
                    r += 10;
                    await g.edit(`존비봇 지식\n\`\`\`${str.slice(p, r).join("\n")}\`\`\``)
                }
            } else if (reaction.emoji.name === "⬅") {
                reaction.users.remove(reaction.users.cache.filter(user => user.id === message.author.id).first().id).catch(() => {});
                if (p !== 0) {
                    p -= 10;
                    r -= 10;
                    await g.edit(`존비봇 지식\n\`\`\`${str.slice(p, r).join("\n")}\`\`\``)
                }
            } else if (reaction.emoji.name === "❌") {
                g.reactions.removeAll().catch(() => {});
            }
        })
    })
}