const Base64 = require('js-base64').Base64,
    { MessageEmbed } = require("discord.js");

module.exports = {
    name: "복호화",
    aliases: [],
    category: "재미",
    run: async (client, message, args) => {
        if (!args.join(" ")) return message.channel.send("우어.. 뒤에다가 무언가를 적어..라");
        if (args.join(" ").length > 100) return message.channel.send("우어.. 100글자이내로 적어달라..");

        message.channel.send(new MessageEmbed().setColor("RED").addField("복호화 전", args.join(" ")).addField("복호화 후", Base64.decode(args.join(" "))))
    }
}