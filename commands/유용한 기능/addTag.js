module.exports = {
    name: "배워",
    aliases: ["지식추가", "익혀"],
    category: "유용한 기능",
    async run (client, message, args) {
        if (!args[0] || !args.slice(1).join(" ")) return message.channel.send("배울 어휘와 어휘 반응을 적어주세요.");
        if (args[0].includes("@everyone") || args.slice(1).join(" ").includes("@everyone") || args[0].includes("@here") || args.slice(1).join(" ").includes("@here")) return message.channel.send("everyone, here와 같은 멘션은 제외해주세요.");
        if ((await client.db('book').where({ title: args[0] }))[0]) return message.channel.send("이미 배운 내용이에요..");
        await client.db('book').insert({ id: message.author.id, title: args[0], desc: args.slice(1).join(" "), count: 0 });
        message.channel.send("배우기 완료.");
    }
}