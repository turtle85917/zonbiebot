const math = require('mathjs')

module.exports = {
    name: '계산기',
    aliases: [],
    category: '수학',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('뒤에 수학 식이 없습니다!');
        try {
            let resp = math.evaluate(args.join(' '))
            return message.channel.send(new(require('discord.js')).MessageEmbed().setColor(0xffffff).setDescription(`Input\n\`\`\`js\n${args.join(' ')}\`\`\`\nOutput\n\`\`\`js\n${resp}\n\`\`\``))
        } catch (e) {return message.channel.send(`에러..\n${e.message||e}`)}
    }
}