module.exports = {
    name: "세계시간",
    aliases: [],
    category: "재미",
    run: async (client, message, args, ops) => message.channel.send(new(require("discord.js")).MessageEmbed().setColor("DARK_RAD").setTitle(`🕘 세계시간`).setDescription(`:flag_kr: KST 한국 표준시\n\`${ops.getWorldTime(+9)}\`\nPST 태평양 표준시\n\`${ops.getWorldTime(-8)}\`\nPDT 태평양 표준시 DST\n\`${ops.getWorldTime(-7)}\`\nEST 뉴욕 시간\n\`${ops.getWorldTime(-5)}\`\nEDT 뉴욕 시간 DST\n\`${ops.getWorldTime(-4)}\`\nCET 파리 시간\n\`${ops.getWorldTime(+1)}\`\nCEST 파리 시간 EST\n\`${ops.getWorldTime(+2)}\`\nCST 중국 표준시\n\`${ops.getWorldTime(+8)}\`\nUTC 세계 표준시\n\`${ops.getWorldTime(0)}\``))
}