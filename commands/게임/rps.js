const { MessageEmbed } = require("discord.js");
const Choose = ["✌", "✊", "✋"];

module.exports = {
    name: "가위바위보",
    aliases: [],
    category: "게임",
    run: async (client, message, args) => {
        message.channel.send("우어.. (안) 내면 지는거임..").then(async t => {
            await t.react("✌");
            await t.react("✊");
            await t.react("✋");

            t.awaitReactions((reaction, user) => (reaction.emoji.name === "✌" || reaction.emoji.name === "✊" || reaction.emoji.name === "✋") && user.id === message.author.id, {
                max: 1,
                time: 20000
            }).then(async collected => {
                const choose = collected.array()[0].emoji.name;
                const bot = Choose[Math.floor(Math.random() * Choose.length)];
                let result = "";

                if ((choose === "✊" && bot === "✌") || (choose === "✋" && bot === "✊") || (choose === "✌" && bot === "✋")) result = `님이 이겼네요..`
                else if (choose === bot) result =  `비김`;
                else result = `내가 이김`;

                t.edit(`<@${message.author.id}> ${choose} vs ${bot} ${client.user.username}\n${result}`)
            })
        })
    }
}