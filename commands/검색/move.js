const fetch = require('node-fetch'),
    { MessageEmbed } = require("discord.js")

module.exports = {
    name: '영화',
    aliases: [],
    category: '검색',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send('우어.. 영화 제목을 입력해라..')

        const res = await fetch(`https://openapi.naver.com/v1/search/movie?query=${encodeURI(args.join(" "))}`, {method: 'GET', headers: {"X-Naver-Client-Id": 'Zf95N7IPgvO8Sj_FM4hv', "X-Naver-Client-Secret": '9AMXsj3CQo'}}).then(e => e.json())

        if (!res.items[0]) return message.channel.send(`우어.. ${args.join(' ')}(이)라는 영화를 찾을 수 없다..`)

        const { items: [ { title, subtitle, link, image, pubDate, director, actor, userRating } ] } = res

        message.channel.send(new MessageEmbed().setAuthor('Naver Movie', 'https://www.naver.com/favicon.ico?1', 'https://movie.naver.com/').setTitle('네이버 영화').setURL(link).setThumbnail(image).setColor(0x00ff00).setDescription(`**${title.replace(/<b>/g, '').replace(/<\/b>/g, '')}**\n${subtitle && `(${subtitle.replace(/<b>/g, '').replace(/<\/b>/g, '')})\n`}\n**제작연도**: ${pubDate}년\n**감독**: ${director.split('|').slice(0, -1).join(', ') || "알 수 없음"}\n**배우**: ${actor.split('|').slice(0, -1).join(', ') || "알 수 없음"}\n**평점**: ${parseFloat(userRating) || "없음"}`))
    }
}