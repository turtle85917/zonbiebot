let Inko = require("inko"),
    inko = new Inko(),
    { MessageEmbed } = require("discord.js");

module.exports = {
    name: "바꿔",
    aliases: [],
    category: "재미",
    run: async (client, message, args) => {
        if (!args.join(" ")) return message.channel.send("우어.. 뒤에다가 무언가를 적어..라");
        if (args.join(" ").length > 100) return message.channel.send("우어.. 100글자이내로 적어달라..");

        let world = inko.en2ko(args.join(" "))
        if (world == args.join(" ")) world = inko.ko2en(args.join(" "));

        message.channel.send(new MessageEmbed().setColor("GREEN").addField("바꾸기 전", args.join(" ")).addField("바꾼 후", world))
    }
}