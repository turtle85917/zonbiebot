const babel = require('@babel/core'), fs = require("fs");

module.exports = {
    name: 'babel',
    aliases: ['바벨', '성경'],
    category: "코딩",
    run: async (_, message, args) => {
        if (!args.join(' ')) return message.channel.send("컴파일할 코드를 써 주세요!");
        try {
            let compiled = babel.transform(args.join(' ').replace(/^\`\`\`(js)?/, '').replace(/\`\`\`$/, ''), {presets: ["@babel/preset-env", "@babel/preset-react"], env: {production: {presets: ["minify", "@babel/preset-react"]}}});
            if (compiled.code.length > 1000) message.channel.send("코드가 길어 파일로 보냈어요!", new(require('discord.js')).MessageAttachment(new Buffer.from(compiled.code), `code.txt`));
            else message.channel.send(new(require('discord.js')).MessageEmbed().setTitle("Babel").addField("Input", `\`\`\`js\n${args.join(' ').replace(/^\`\`\`(js)?/, '').replace(/\`\`\`$/, '')}\n\`\`\``).addField("Output", `\`\`\`js\n${compiled.code}\n\`\`\``))
        } catch (e) {return message.channel.send(e.message || e)}
    }
}