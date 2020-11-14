const { MessageEmbed } = require("discord.js"),
    axios = require("axios"),
    cheerio = require("cheerio")

module.exports = {
    name: "나무위키",
    aliases: ["꺼무위키"],
    category: "검색",
    run: async (client, message, args) => {
        if (!args.join(" ")) return message.channel.send("우어.. 뒤에다가 검색어를 입력해달라..")

        await axios.get(`https://namu.wiki/Search?q=${encodeURI(args.join(" "))}`).then(res => {
            if (res.status !== 200) return message.channel.send(`우어.. 정보를 불러 올 수 없다...`);
            let $ = cheerio.load(res.data), str = ``;
            $("div.search-item").each((i, element) => {
                if (i < 9) str += `[${$(element).find("h4 > a").text().trim()}](https://namu.wiki${$(element).find("h4 > a").attr("href")})\n`
            })
            if (!str) return message.channel.send(`${client.emojis.cache.get('730738432929693727')} 우어.. 검색 결과가 없다..`);
            message.channel.send(new MessageEmbed().setTitle(`${client.emojis.cache.get("730738098463440988")} ${args.join(" ").length > 100 ? `${args.join(" ").slice(0, 100)}...` : args.join(" ")}(에)대한 검색결과`).setDescription(str).setColor(0x008275))
        })
    }
}