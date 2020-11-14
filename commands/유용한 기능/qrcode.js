let fetch = require('node-fetch'), { MessageAttachment } = require('discord.js'), qrcode= require('qrcode');

module.exports = {
    name: "qr코드",
    aliases: [],
    category: "유용한 기능",
    run: async (client, message, args) => {
        if (!args.join(" ")) return message.channel.send("우어... 뒤에다가 무언가라도 입력해라...");

        let res = await fetch(`https://openapi.naver.com/v1/util/shorturl?url=${encodeURI(args.join(" "))}`, {method: 'GET', headers: {"X-Naver-Client-Id": 'Zf95N7IPgvO8Sj_FM4hv', "X-Naver-Client-Secret": '9AMXsj3CQo'}}).then(e => e.json()), output = res.result
        if (!output) return message.channel.send('우어.. 너무 길ㄷ..다')
        const Canvas = require("canvas"), canvas = Canvas.createCanvas(300, 300), ctx = canvas.getContext('2d')
        qrcode.toCanvas(canvas, output.url, async (err, url) => {
            if (err) console.error(err);
            //const avatar = await Canvas.loadImage(url)
            ctx.drawImage(url, 400, 50, 200, 200)
            message.channel.send({ files: [new MessageAttachment(canvas.toBuffer())] })
        })
    }
}