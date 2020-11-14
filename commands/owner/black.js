module.exports = {
    name: "블랙리스트",
    aliases: [],
    category: "owner",
    async run (client, message, _) {
        (client.db('blacklist')).then(e => {
            let str = '';
            for (let i=0;i < e.length;i++) {
                str += `[${client.users.cache.get(e[i].id).username}#${client.users.cache.get(e[i].id).discriminator.replace(/..$/, '**')}] - ${e[i].why}`;
            }
            if (!str) return message.channel.send("블랙리스트가 비어있네요.");
            message.channel.send(str, { code: "" });
        })
    }
}