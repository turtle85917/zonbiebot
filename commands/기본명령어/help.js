const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "도움",
    aliases: ["도움말"],
    category: "기본명령어",
    usage: "존비야 도움 [명령어 이름]",
    run: async (client, message, args) => {
        const commands = category => client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(", ");
        if (!args.join(" ")) {
            let help = new MessageEmbed().setTitle(`${client.user.username} 도움말`)
            message.channel.send(client.categories.filter(a => a !== "owner").map(e => help.addField(e, commands(e))))
        } else {
            let find = client.categories.filter(x => x.includes(args.join(" "))), cmd = client.commands.get(args.join(" ").toLowerCase()) || client.commands.get(client.aliases.get(args.join(" ").toLowerCase()));
            if (find[0] && !cmd) {
                return message.channel.send(`${client.emojis.cache.get("730738098463440988")}검색 결과: ${find[0]}\n\n명령어: ${commands(find[0])}`)
            } else if (!find[0] && cmd) {
                return message.channel.send(`**이름**\n${cmd.name}${cmd.aliases[0] ? `\n**별칭**\n${cmd.aliases.join(", ")}` : ''}\n**카테고리**\n${cmd.category}\n${cmd.name == 'complie' ? '\n출처: `https://github.com/1Computer1/comp_iler`' :' '}`)
            } else if (!find[0] && !cmd) return message.channel.send(`${client.emojis.cache.get('730738432929693727')} 우어.. 명령어를 찾지 못.. 했다..`)
        }
    }
}
