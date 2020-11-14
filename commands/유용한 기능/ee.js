const Hangul = require('hangul-js');

module.exports = {
    name: '문자',
    aliases: [],
    category: '유용한 기능',
    run: async (client, message, args) => {
        if (!args[0] || !args[1] || !args.slice(2).join(' ')) return message.channel.send('`존비야 문자 <바꿀 단어> <바뀔 단어> <문장>`');
        let input = args.slice(2).join(' ')
        function stronger(x) {
            if (x == Hangul.d(args[0])[0]) return Hangul.d(args[1])[0]
            return x;
        }

        message.channel.send(new(require("discord.js")).MessageEmbed().setDescription(Hangul.a(Hangul.d(input).map(stronger))).setTitle('문자 바꾸기').setFooter(`참고: \`${Hangul.d(args[0])[0]} -> ${Hangul.d(args[1])[0]}\``))
    }
}