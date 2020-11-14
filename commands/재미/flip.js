let filp = require("flip-text"),
    { MessageEmbed } = require("discord.js");

module.exports = {
    name: "뒤집어",
    aliases: [],
    category: "재미",
    run: async (clinet, message, args) => {
        if (!args.join(" ")) return message.channel.send("우어.. 뒤에다가 무언가를 적어..라");
        if (args.join(" ").length > 100) return message.channel.send("우어.. 100글자이내로 적어달라..");

        message.channel.send(new MessageEmbed().setColor("GREEN").addField("뒤집기 전", args.join(" ")).addField("뒤집은 후", filp(args.join(" "))))
    }
}