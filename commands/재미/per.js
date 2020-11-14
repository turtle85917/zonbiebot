module.exports = {
    name: '피라미드',
    aliases: [],
    category: '재미',
    run: async (client, message, args, ops) => {
        if (!args[0] || !args[1]) return message.channel.send('`존비야 피라미드 <반복할 숫자> <단어>`')
        if (isNaN(args[0])) return message.channel.send('`존비야 피라미드 <반복할 숫자> <단어>`')
        if (Number(args[0]) > 10 || args[0].includes('.')) return message.channel.send('`존비야 피라미드 <반복할 숫자 <= 10> <단어>`')
        message.channel.send(`${ops.per(Number(args[0]), args[1][0])}`).catch((e) => message.channel.send(`에러남.\n${e.message || e}`))
    }
}