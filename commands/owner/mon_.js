module.exports = {
    name: "답변",
    aliases: [],
    category: "owner",
    async run (client, message, args, ops) {
        if (!args[0] || !args.slice(1).join(' ')) return;
        client.users.cache.get(args[0]).send(`${args.slice(1).join(" ")}`);
        message.channel.send("완료!")
    }
}