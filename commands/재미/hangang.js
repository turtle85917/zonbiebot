const { createCanvas, loadImage } = require("canvas"), { MessageAttachment } = require("discord.js");

module.exports = {
    name: "한강온도",
    aliases: ["한강수온", "한강"],
    category: "재미",
    run: async (client, message, args, { formatTime }) => {
        const { temp, time } = await require("node-fetch")("http://hangang.dkserver.wo.tc/").then(e => e.json());
        const canvas =  createCanvas(1920, 1080);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = 'rgb(100, 100, 100)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = `120px NanumSquare_ac`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";

        ctx.strokeText(`한강 온도 정보에요!`, canvas.width / 2, 200);
        ctx.fillText(`한강 온도 정보에요!`, canvas.width / 2, 200);

        ctx.font = `190px NanumSquare_ac`;
        ctx.strokeStyle = "white";

        ctx.strokeText(`${temp}°C`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`${temp}°C`, canvas.width / 2, canvas.height / 2);

        ctx.font = `70px NanumSquare_ac`;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";

        ctx.strokeText(`"${time}" 기준`, canvas.width / 2, 800);
        ctx.fillText(`"${time}" 기준`, canvas.width / 2, 800);

        const avatar = await loadImage(message.member.user.displayAvatarURL({ format: 'png' }))
        ctx.drawImage(avatar, 320, 740, 150, 150)

        if (message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send({ embed: { image: { url: "attachment://result.png" }, files: [new MessageAttachment(canvas.toBuffer(), "result.png")] } });
        else message.channel.send(new(require('discord.js')).MessageEmbed().setTimestamp().setDescription(`**${temp}℃**`).setFooter(`${formatTime(time)} 기준`))
    }
}