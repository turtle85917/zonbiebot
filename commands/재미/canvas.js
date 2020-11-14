const canvas = require("canvas").createCanvas(512, 512), { MessageAttachment } = require('discord.js');

module.exports = {
    name: "프사만들기",
    aliases: ["프사제작"],
    category: "재미",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(`우어.. 5 ~ 512에 폰트 크기를 입력해라..`)
        if (isNaN(args[0])) return message.channel.send(`우어.. 폰트 크기는.. 자연수만 입력할 수 있ㄷ..다`)
        if (args[0] < 5 || args[0] > 512 || args[0].includes('.')) return message.channel.send(`우어.. 5 ~ 512에 폰트 크기를 입력해라..`)
        if (!args.slice(1).join(" ")) return message.channel.send(`우어.. 프사에 넣을 글자를.. 입력해라..`)
        const ctx = canvas.getContext('2d')
        const value = args.slice(1).join(' ')
        
        ctx.fillStyle = 'rgb(51, 51, 51)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = `${parseInt(args[0])}px "CookieRun Black"`
        ctx.textBaseline = 'middle'
        ctx.textAlign = "center"

        ctx.fillStyle = "white"
        ctx.strokeStyle = "white"

        ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
        ctx.fillText(value, canvas.width / 2, canvas.height / 2)

        message.channel.send({ files: [new MessageAttachment(canvas.toBuffer())] })
    }
}