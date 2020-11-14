const fetch = require("node-fetch"),
    { MessageEmbed } = require("discord.js")

module.exports = {
    name: "네이버실검",
    aliases: [],
    category: "naver",
    run: async (client, message, args) => fetch("https://www.naver.com/srchrank?frm=main").then(e => e.json()).then(a => message.channel.send(new MessageEmbed().setAuthor("Naver", "https://www.naver.com/favicon.ico?1", "https://naver.com/").setTitle("네이버 실시간 검색어").setColor(0x00ff00).setTimestamp().setDescription(a.data.slice(0, 15).map((e, i) => `**${i+1}위** - [\`${e.keyword}\`](https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${e.keyword.replace(/ /g, "+")})`)).setFooter(message.author.username, message.author.displayAvatarURL())))
}