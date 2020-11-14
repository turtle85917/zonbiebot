module.exports = {
    name: 'license',
    aliases: ["라이선스"],
    category: '코딩',
    run: async (client, message, args) => {
        try {
            if (!args.join(' ')) return message.channel.send("라이선스 종류를 적어주세요!");
            if (args.join(' ') === 'None') return message.channel.send('해당 라이선스를 txt 파일로 올렸어요!', new(require('discord.js')).MessageAttachment(new Buffer.from(''), `None.txt`))
            let m = require('license').findLicense(args.join(' '));
            if (!m[0]) return message.channel.send("그런 라이선스 없는데요!");
            message.channel.send('해당 라이선스를 txt 파일로 올렸어요!', new(require('discord.js')).MessageAttachment(new Buffer.from(require('license').getLicense(m[0], { author: message.author.tag, year: new Date().getFullYear() })), `${m[0]}.txt`));
        } catch (e) {return message.channel.send(`에러..\n${e.message || e}`)}
    }
}