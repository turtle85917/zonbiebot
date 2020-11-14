module.exports = {
    name: "진법",
    aliases: [],
    category: "수학",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("우어.. 숫자르..를 입력해라..");
        if (isNaN(args[0])) return message.channel.send("우어.. 숫자르..를 입력해라..");
        if (Number(args[0]).length > 100) return message.channel.send("숫자가 너무 크다..")

        message.channel.send(new(require("discord.js")).MessageEmbed().setColor("GRAY").setDescription(`10진법 -> 16, 8, 2\n**10진법 -> 16진법**\n${Number(args[0]).toString(16)}\n**10진법**\n${Number(args[0])}\n**10진법 -> 8진법**\n${Number(args[0]).toString(8)}\n**10진법 -> 2진법**\n${Number(args[0]).toString(2)}`))
    }
}