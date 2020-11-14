const cheerio = require("cheerio"),
    axios = require("axios"),
    { MessageEmbed } = require("discord.js")

module.exports = {
    name: '멜론차트',
    aliases: ['멜차'],
    category: '검색',
    run: async (client, message, args) => {
        let result = [], artist = new Array()
        await axios.get('http://www.melon.com/chart/').then(res => {
            if(res.status !== 200)return;
    
            const $ = cheerio.load(res.data);

            $("div.wrap > div.wrap_song_info > div.ellipsis.rank01").each((element) => result.push({ title: $(element).find("span > a").text() }))
    
            for (let i = 0; i < 100; i++) {
                $('.checkEllipsis').each(function(){
                    let artist_info = $(this)
                    let artist_info_text = artist_info.text()
                    artist[i] = artist_info_text
                    i++
                })
            }

            if (!args[0]) {
                message.channel.send(new MessageEmbed().setTitle("멜론 차트 1위 ~ 10위").setColor(0x00ff00).setAuthor("Melon", "https://img1.daumcdn.net/thumb/C500x500.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/5fXt/image/YUEdn1eyBz1ThXP4wqiosPurn28.png", "https://melon.com/").setDescription(result.slice(0, 10).map((e, i) => `${i+1}위 ${e.title} - ${artist[i]}`).join("\n")).setFooter(`${$("div.calendar_prid > span.yyyymmdd > span.year").text()} ${$("span.hhmm > span.hour").text()} 업데이트`).setTimestamp())
            } else {
                if (isNaN(args[0]) || Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("자연수를 입력해주세요!");
                message.channel.send(new MessageEmbed().setTitle(`멜론 차트 ${args[0]}위`).setColor(0x00ff00).setAuthor("Melon", "https://img1.daumcdn.net/thumb/C500x500.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/5fXt/image/YUEdn1eyBz1ThXP4wqiosPurn28.png", "https://melon.com/").setDescription(`${args[0]}위 ${result[Number(args[0])].title} ${artist[Number(args[0]) - 1]}`).setFooter(`${$("div.calendar_prid > span.yyyymmdd > span.year").text()} ${$("span.hhmm > span.hour").text()} 업데이트`).setTimestamp())
            }
        })
    }
}