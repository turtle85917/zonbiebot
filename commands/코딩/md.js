module.exports = {
    name: 'markdown',
    aliases: ['md'],
    category: '코딩',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send('뒤에 아무거나 입력해보세요!')
        message.channel.send(new(require('discord.js')).MessageEmbed().setColor('BLUE').setDescription(`\`\`\`md\n${args.join(' ')}\n\`\`\`\n\`\`\`html\n${require('markdown-it')().render(args.join(' '))}\n\`\`\``))
    }
}