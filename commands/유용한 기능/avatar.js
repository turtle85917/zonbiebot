module.exports = {
    name: "프사",
    aliases: ["프사", "프로필사진"],
    category: "유용한 기능",
    run: async (client, message, args, ops) => message.channel.send(new (require("discord.js")).MessageEmbed().setTitle(`${ops.getMember(message, args.join(" ")).user.username} - 프사`).setColor(0xfffffe).setImage(ops.getMember(message, args.join(" ")).user.displayAvatarURL({dynamic: true, format: "png", size: 1024})))
}