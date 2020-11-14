module.exports = {
    name: "블랙리스트제거",
    aliases: [],
    category: "owner",
    async run (client, message, args) {
        let member = client.users.cache.get(args[0]);
        if (!member) return message.channel.send("ID를 적어주세요!");
        if (!(await client.db('blacklist').where('id', args[0]))[0]) return message.channel.send("블랙리스트에 없는 사람을 제거할 수 없어요!");
        await client.db('blacklist').delete().where("id", args[0]);
        message.channel.send(`블랙리스트 해제`);
    }
}