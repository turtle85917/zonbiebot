const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "레포지토리",
    aliases: ["레포"],
    category: "검색",
    run: async (client, message, args, ops) => {
        if (!args[0]) return message.channel.send("유저 이름을 입력해 주세요!")
        if (!args[1]) return message.channel.send("레포지토리 이름을 입력해 주세요!")

        const { html_url, description, created_at, owner, name, homepage, language, stargazers_count, license, updated_at } = await fetch(`https://api.github.com/repos/${encodeURI(args[0])}/${encodeURI(args[1])}`).then(e => e.json());

        if (!html_url) return message.channel.send(`${args[0]}(이)라는 유저의 ${args[1]}(이)라는 레포지토리를 찾을 수 없습니다...`);

        message.channel.send(new MessageEmbed().setTitle(name).setColor(0x000000).setAuthor("Github", "https://github.githubassets.com/favicons/favicon.png", "https://github.com/").setFooter(owner.login, owner.avatar_url).setThumbnail(owner.avatar_url).setDescription(`[들어가기](${html_url})`)
        .addFields([
            {name: "이름", value: `**${name}**`},
            {name: "설명", value: `**${description ? description : "없음"}**`, inline: true},
            {name: "홈페이지", value: `**${homepage ? homepage : "없음"}**`, inline: true},
            {name: "주요 언어", value: `**${language ? language : "없음"}**`},
            {name: "스타 수", value: `**${stargazers_count ? stargazers_count : 0}개**`},
            {name: "라이센스", value: `**${license && license.name ? license.name : "없음"}**`},
            {name: "생성 날짜", value: `**${ops.formatTime(created_at)}**`},
            {name: "업데이트 날짜", value: `**${ops.formatTime(updated_at)}**`}
        ]))
    }
}