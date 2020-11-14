module.exports = {
    name: '마크스킨',
    aliases: [],
    category: '전적',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send('마크 스킨을 볼 유저의 이름을 입력하세요!')
        if(args.join(' ').length > 100) return message.channel.send('100글자 이내로 유저 이름을 적으삼')
        message.channel.send(new(require('discord.js')).MessageEmbed().setColor('GREEN').setTitle(`${args.join(' ')} 스킨 `).setDescription(`[[ 아바타 ]](https://minotar.net/helm/${encodeURI(args.join(' '))}/100.png) [[ 3D 아바타 ]](https://minotar.net/cube/${encodeURI(args.join(' '))}/100.png)\n[[ 전신 ]](https://minotar.net/armor/body/${encodeURI(args.join(' '))}/100.png) [[ 반신 ]](https://minotar.net/armor/bust/${encodeURI(args.join(' '))}/100.png) [[ 다운로드 ]](https://minotar.net/download/${encodeURI(args.join(' '))})`).setThumbnail(`https://minotar.net/armor/bust/${encodeURI(args.join(' '))}/100.png`).setFooter('이미지가 안 나오면 마크 유저 이름을 확인하세요!'))
    }
}