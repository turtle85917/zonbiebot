const Myriad = require('../../src/tools/myriad')

module.exports = {
    name: 'languages',
    aliases: ['언어'],
    category: '코딩',
    async run(client, message, args) {
        const languages = await client.myriad.getLanguages();
        return message.channel.send([`complie 명령어에서 사용가능한 언어`,
        ...languages.map(lang => `\`${Myriad.Languages.get(lang).join('`, `')}\``)
        ]);
    }
}