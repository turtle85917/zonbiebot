const { MessageEmbed } = require("discord.js"),
    fetch = require("node-fetch"),
    Turndown = require('turndown');

module.exports = {
    name: "mdn",
    aliases: ["모질라", "mozila"],
    category: "코딩",
    run: async (client, message, args) => {
        if (!args.join(" ")) return message.channel.send("우어.. 뒤에다가 뭐라도.. 적어라");
        const queryString = args.join(" "); let body;
        try {await fetch(`https://mdn.pleb.xyz/search?q=${encodeURI(queryString)}`).then(res=>res.json())} catch (e) {return message.channel.send(`${args[0]}(을)를.. 찾을 수 없다..\n${e.message || e}`)}
        let main = body.Translations.find(r => r.Locale === 'ko')
        if(!main) {main = body; main.noTran = true}
        if (!body.URL || !body.Title || !body.Summary) return message.reply('우어.. 그런거는 없다..')

        const turndown = new Turndown()
        const embed = new MessageEmbed()
        .setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
        .setURL(`https://developer.mozilla.org${main.URL}`)
        .setTitle(main.Title)
        .setDescription(turndown.turndown(main.Summary.replace(/<code><strong>(.+)<\/strong><\/code>/g, '<strong><code>$1</code></strong>')))
		.setFooter(main.noTran ? "이 페이지는 한글 번역이 완료되어 있지 않아 영어로 출력함" : "")
        return message.channel.send(embed)
    }
}