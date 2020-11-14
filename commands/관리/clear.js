const { MessageAttachment } = require("discord.js")

module.exports = {
    name: "지워",
    aliases: ["삭제", "청소"],
    category: "관리",
    guildOnly: true,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`너는 메시지를 삭제할 권한이 없어..`, new MessageAttachment("C:\\Users\\ADMIN\\Downloads\\zombie\\src\\img\\message.png"))
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply(`나는 메시지를 삭제할 권한이 없어..`, new MessageAttachment("C:\\Users\\ADMIN\\Downloads\\zombie\\src\\img\\message.png"))
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0 || args.join(" ").includes(".")) return message.reply("자연수만 입력해라..");

        let deleteAmount;
    
        if (parseInt(args[0]) > 100) deleteAmount = 100;
        else deleteAmount = parseInt(args[0]);

        message.channel.bulkDelete(deleteAmount, true).then(size => message.channel.send(`\`${size.size}\`개에 메시지를 삭제..했다..`)).then(m => m.delete({ timeout: 5000 })).catch(e => message.channel.send(`에러..\n${e}`))
    }
}