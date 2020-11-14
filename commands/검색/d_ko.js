let fetch = require('node-fetch'), { MessageEmbed} = require('discord.js');

module.exports = {
    name: "책",
    aliases: [],
    category: '검색',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send('`존비야 책 <책_이름>`');

        let res = await fetch(`https://openapi.naver.com/v1/search/book?query=${encodeURI(args.join(" "))}`, {method: 'GET', headers: {"X-Naver-Client-Id": 'Zf95N7IPgvO8Sj_FM4hv', "X-Naver-Client-Secret": '9AMXsj3CQo'}}).then(e => e.json())

        if (!res.items[0]) return message.channel.send(`${args.join(' ')}(이)라는 책을 찾을 수 없다..`);

        const { items: [ { title, link, image, author, price, discount, publisher, pubdate, description } ] } = res;

        message.channel.send(new MessageEmbed().setAuthor('Naver Book', 'https://www.naver.com/favicon.ico?1', 'https://book.naver.com/').setTitle('네이버 책').setURL(link).setThumbnail(image).setColor(0x00ff00).setDescription(`**${title.replace(/<b>/g, '').replace(/<\/b>/g, '')}**\n\n**지은이**: ${author}\n**출판사**: ${publisher}\n**가격**: ${price}원\n${price == discount ? '' : `**할인된 가격**: ${discount}원`}\n**제작연도**: ${pubdate}\n**설명**: ${description.replace(/<b>/g, '').replace(/<\/b>/g, '')}`))
    }
}