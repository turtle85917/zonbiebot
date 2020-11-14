module.exports = {
    name: "업타임",
    aliases: [],
    category: "기본명령어",
    run: async (client, message, args, ops) => message.channel.send(new(require("discord.js")).MessageEmbed().setColor("GREEN").setDescription(`🕓 우어어.. ${ops.formatTime(client.readyAt)}에 봇이 켜졌고...\n${ops.getUptime(client)}동안 사람들을 ~~감염~~시켰다.. 우어..`))
}