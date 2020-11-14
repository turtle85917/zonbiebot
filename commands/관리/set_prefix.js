module.exports = {
    name: "접두사설정",
    aliases: [],
    category: "관리",
    guildOnly: true,
    async run (client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("관리자 권한 필요.")
        if (!args[0]) return message.channel.send("설정할 접두사를 적어주세요.\n접두사를 잃어버렸다면 존비봇을 멘션해주세요.");
        if (!args[0].length > 20) return message.channel.send("20글자 이내로 적어주세요.");
        if (!(await client.db('guilds').where('id', message.guild.id))[0]) await client.db('guilds').insert({ id: message.guild.id, prefix: "", not_channel: "[]" });
        await client.db('guilds').update({ prefix: args[0] }).where({ id: message.guild.id });
        message.channel.send(`\`${args[0]}\`(으)로 설정`);
    }
}