const { MessageEmbed } = require("discord.js"),
    fetch = require("node-fetch");

module.exports = {
    name: "인스타",
    aliases: ["인스타그램"],
    category: "검색",
    run: async (client, message, args) => {
        if (!args.join(" ")) return message.channel.send("우어ㅏ... 인스타그램 유저를.. 적ㅇ..어달라..");
        let res; try {res = await fetch(`https://www.instagram.com/${encodeURI(args.join(" ").replace(/ /g, "+"))}/?__a=1`).then(e => e.json()); if (!res.graphql) return message.channel.send(`${args.join(" ")}(이)라는 유ㅈ..저를 찾을 수 없다..`)} catch (err) {return message.channel.send(`우어... 에러가 발생했다..\n${err}`)}
        const account = res.graphql.user; message.channel.send(new(require("discord.js")).MessageEmbed().setAuthor("Instargram", "https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png", "https://www.instagram.com/").setColor(0xff00bd).setTimestamp()
        .setFooter(account.username, account.profile_pic_url_hd)
        .setTitle(`${account.full_name} 유저 정보`)
        .setURL(account.external_url_linkshimmed)
        .setThumbnail(account.profile_pic_url_hd)
        .setDescription(`**[페이지에 들어..가려면.. 여기를 눌러라..](https://www.instagram.com/${account.username})**`)
        .addFields([{name: "계정 이름", value: `**${account.username}**`}, {name: "닉네임", value: `**${account.full_name}**`}, {name: "소개글", value: `**${account.biography.length == 0 ? "없음" : account.biography}**`}, {name: "비공개 여부",value: `**${account.is_private ? "비공개 🔐" : "공개 🔓"}**`}, {name: "계정 게시글 수", value: `**${parseInt(account.edge_owner_to_timeline_media.count).toLocaleString()}개**`, inline: true}, {name: "계정 팔로워 수", value: `**${parseInt(account.edge_followed_by.count).toLocaleString()}명**`, inline: true}, {name: "계정 팔로우 수", value: `**${parseInt(account.edge_follow.count).toLocaleString()}명**`, inline: true}]))
    }
}