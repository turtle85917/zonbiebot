const { MessageEmbed } = require("discord.js");
const beautify = require("beautify");

module.exports = {
    name: "eval",
    aliases: ["ㄷㅍ미"],
    category: "owner",
    run: async (client, message, args, ops) => {
        if (!args.join(" ")) return message.channel.send("저기요.. eval 코드 입력 안 했는데요?");

        let input = `const Discord = require("discord.js");\nconst axios = require("axios");\nconst cheerio = require("cheerio");\nconst fetch = require("node-fetch");\nconst fs = require("fs");\n${args.join(" ")}`;

        let type;
        new Promise((resolve) => resolve(eval(input))).then(async res => {
            let output = type = res;

            if (typeof output !== "string") output = require("util").inspect(output);
            if (typeof type === "function") output = type.toString();
            if (output.includes(client.token)) output = output.replace(new RegExp(client.token, "gi"), "Secret");
            if (output.includes(ops.MyBot.token)) output = output.replace(new RegExp(ops.MyBot.token, "gi"), "Secret");

            if (output.length > 1500) output = `${output.substr(0, 1495)}...`;
            if (!output) output = "결과 없음";

            let m = await message.channel.send(new MessageEmbed().setTitle("Eval").setColor(0x00ff00).setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\`\n**📤 Output: **\n\`\`\`js\n${output}\n\`\`\``))
            m.react("🗑"); m.awaitReactions((reaction, user) => (reaction.emoji.name === "🗑") && user.id === ops.ownerID,{max:1}).then(collected => collected.array()[0].emoji.name === "🗑" && m.delete());
        }).catch(e => message.channel.send(new MessageEmbed().setTitle("Eval").setColor(0xff0000).setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\`\n**📤 Output: **\n\`\`\`js\n${e}\n\`\`\``)))
    }
}