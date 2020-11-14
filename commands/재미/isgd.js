const { shorten } = require("isgd");

module.exports = {
    name: "URL단축",
    aliases: ["url단축"],
    category: "재미",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("단축하..할 URL을 적어라.. 우어ㅓㅇ");
        let res = await fetch(`https://openapi.naver.com/v1/util/shorturl?url=${encodeURI(args.join(" "))}`, {method: 'GET', headers: {"X-Naver-Client-Id": 'Zf95N7IPgvO8Sj_FM4hv', "X-Naver-Client-Secret": '9AMXsj3CQo'}}).then(e => e.json()), output = res.result
        shorten(args[0], r => message.channel.send(new(require('discord.js')).MessageEmbed().setColor('GREEN').setDescription(`[is.gd](https://is.gd/)\n${r}\n\nme2.do\n${res.errorMessage ? `Error: ${res.errorMessage}` : output.url }`)));
    }
}