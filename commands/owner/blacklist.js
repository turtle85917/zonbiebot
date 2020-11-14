module.exports = {
    name: "블랙리스트등록",
    aliases: [],
    category: "owner",
    async run (client, message, args) {
        let member = client.users.cache.get(args[0]);
        if (!member) return message.channel.send("ID를 적어주세요!");
        if ((await client.db('blacklist').where('id', args[0]))[0]) return message.channel.send("이미 블랙리스트에 있어요!");
        if (!args.slice(1).join(" ")) return message.channel.send("저런, 사유를 적지 않아군요");
        await client.db('blacklist').insert({ id: args[0], why: args.slice(1).join(" ") });
        message.channel.send(`${args.slice(1).join(" ")}(이)라는 이유로 블랙리스트`);
    }
}