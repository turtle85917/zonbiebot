module.exports = {
    name: "문의",
    aliases: [],
    category: "기본명령어",
    async run (client, message, args, ops) {
        if (!args.join(" ")) return message.channel.send("문의 내용을 적어주세요!");
        client.users.cache.get(ops.ownerID).send(`${args.join(" ")}\n\n--------------------------\n디스코드 유저 ${message.author.tag} 님이 문의했습니다.`);
        message.channel.send("문의 완료!")
    }
}