module.exports = {
    name: "소인수분해",
    aliases: [],
    category: "수학",
    run: async (client, message, args, ops) => {
        let v = ops.readline(Number(args[0]))
        if (!args[0]) return message.channel.send('우어.. 숫자를 입력해라..');
        if (isNaN(args[0]) || args[0].includes('.')) return message.channel.send('우어.. 숫자를 입력해라..');
        if (Number(args[0]) > 100000) return message.channel.send("우어.. 숫자가 크다..");

        v.map(x => {
            if (Number(args[0]) === 1) return message.channel.send('1은 합성수도 아니고 소수도 아니라서 소인수분해가 안 되지 않나요?')
            if (Number(x) === Number(args[0])) return message.channel.send('? 그건 소수아닌가요?')
        })
        message.channel.send(v.map(x => x.toString()).join(' × '))  
        //message.channel.send(v.map(x => x.toString()).join(' × '))
    }
}