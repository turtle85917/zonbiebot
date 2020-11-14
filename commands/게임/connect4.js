module.exports = {
    name: "connect4",
    aliases: [],
    category: "게임",
    guildOnly: true,
    async run (_, message, __) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("메시지 수정 권한이 없어요!");
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("메시지 수정 권한이 없어요!");
        new(require("../../src/tools/connect4"))(message).newGame(message);
    }
}